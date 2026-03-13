#!/usr/bin/env node
import { parseArgs } from "node:util";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "help" || command === "--help") {
    printUsage();
    return;
  }

  try {
    switch (command) {
      case "compile":
        await runCompile(args.slice(1));
        break;
      case "render":
        await runRender(args.slice(1));
        break;
      case "capture":
        await runCapture(args.slice(1));
        break;
      case "compare":
        await runCompare(args.slice(1));
        break;
      case "pipeline":
        await runPipeline(args.slice(1));
        break;
      case "export":
        await runExport(args.slice(1));
        break;
      case "doctor":
        await runDoctor();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printUsage();
        process.exit(2);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(`Error: ${message}`);
    process.exit(2);
  }
}

async function runCompile(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath) {
    console.error("Usage: figma-dsl compile <dsl-file> [-o output.json]");
    process.exit(2);
  }

  const { compile } = await import("@figma-dsl/core");
  const mod = await import(resolve(dslPath)) as Record<string, unknown>;
  const dslNode = mod["default"] ?? mod["component"];

  if (!dslNode) {
    console.error("DSL module must export a default or 'component' DslNode");
    process.exit(2);
  }

  const result = compile(dslNode as import("@figma-dsl/core").DslNode);

  if (result.errors.length > 0) {
    for (const err of result.errors) {
      console.error(`Compile error [${err.nodePath}]: ${err.message}`);
    }
  }

  const json = JSON.stringify(result, null, 2);

  if (values.output) {
    writeFileSync(values.output, json);
    console.log(`Compiled to ${values.output} (${String(result.nodeCount)} nodes)`);
  } else {
    console.log(json);
  }
}

async function runRender(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
      scale: { type: "string", short: "s" },
      bg: { type: "string" },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath) {
    console.error("Usage: figma-dsl render <dsl-file> -o output.png [--scale 2] [--bg #ffffff]");
    process.exit(2);
  }

  const outputPath = values.output ?? "output.png";

  const { compile } = await import("@figma-dsl/core");
  const { renderToFile } = await import("@figma-dsl/renderer");

  const mod = await import(resolve(dslPath)) as Record<string, unknown>;
  const dslNode = mod["default"] ?? mod["component"];

  const compiled = compile(dslNode as import("@figma-dsl/core").DslNode);
  const result = renderToFile(compiled.root, outputPath, {
    scale: values.scale ? Number(values.scale) : undefined,
    backgroundColor: values.bg,
  });

  if (result.errors.length > 0) {
    for (const err of result.errors) {
      console.error(`Render error [${err.nodePath}]: ${err.message}`);
    }
  }

  console.log(`Rendered ${String(result.width)}x${String(result.height)} to ${outputPath}`);
}

async function runCapture(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
      viewport: { type: "string", short: "v" },
      props: { type: "string" },
      url: { type: "string" },
    },
    allowPositionals: true,
  });

  const outputPath = values.output ?? "capture.png";

  if (values.url) {
    const { captureUrl } = await import("@figma-dsl/comparator");
    const viewport = parseViewport(values.viewport);
    const result = await captureUrl(values.url, outputPath, { viewport });
    console.log(`Captured ${String(result.width)}x${String(result.height)} to ${result.outputPath}`);
  } else {
    const componentPath = positionals[0];
    if (!componentPath) {
      console.error("Usage: figma-dsl capture <component-path> -o output.png [--viewport 800x600]");
      process.exit(2);
    }

    const { capture } = await import("@figma-dsl/comparator");
    const viewport = parseViewport(values.viewport);
    const props = values.props ? JSON.parse(values.props) as Record<string, unknown> : undefined;
    const result = await capture(resolve(componentPath), outputPath, { viewport, props });
    console.log(`Captured ${String(result.width)}x${String(result.height)} to ${result.outputPath}`);
  }
}

async function runCompare(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
      threshold: { type: "string", short: "t" },
    },
    allowPositionals: true,
  });

  const [image1, image2] = positionals;
  if (!image1 || !image2) {
    console.error("Usage: figma-dsl compare <image1.png> <image2.png> [-o diff.png] [-t 95]");
    process.exit(2);
  }

  const { compare } = await import("@figma-dsl/comparator");
  const diffPath = values.output ?? "diff.png";
  const failThreshold = values.threshold ? Number(values.threshold) : undefined;

  const result = compare(image1, image2, diffPath, { failThreshold });

  console.log(`Similarity: ${result.similarity.toFixed(2)}%`);
  console.log(`Mismatched pixels: ${String(result.mismatchedPixels)} / ${String(result.totalPixels)}`);
  console.log(`Dimensions match: ${String(result.dimensionMatch)}`);
  console.log(`Result: ${result.passed ? "PASS" : "FAIL"}`);

  if (result.diffImagePath) {
    console.log(`Diff image: ${result.diffImagePath}`);
  }

  if (!result.passed) {
    process.exit(1);
  }
}

async function runPipeline(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
      viewport: { type: "string", short: "v" },
      threshold: { type: "string", short: "t" },
      scale: { type: "string", short: "s" },
      component: { type: "string", short: "c" },
      url: { type: "string" },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath) {
    console.error("Usage: figma-dsl pipeline <dsl-file> --component <component-path> [-o output-dir]");
    process.exit(2);
  }

  const outDir = values.output ?? ".";
  const scale = values.scale ? Number(values.scale) : 1;

  // Step 1: Compile
  console.log("Stage 1/4: Compiling DSL...");
  const { compile } = await import("@figma-dsl/core");
  const mod = await import(resolve(dslPath)) as Record<string, unknown>;
  const dslNode = mod["default"] ?? mod["component"];
  const compiled = compile(dslNode as import("@figma-dsl/core").DslNode);

  if (compiled.errors.length > 0) {
    for (const err of compiled.errors) {
      console.error(`Compile error [${err.nodePath}]: ${err.message}`);
    }
    console.error("Pipeline failed at compile stage");
    process.exit(2);
  }

  // Step 2: Render
  console.log("Stage 2/4: Rendering...");
  const { renderToFile } = await import("@figma-dsl/renderer");
  const renderPath = resolve(outDir, "render.png");
  const renderResult = renderToFile(compiled.root, renderPath, { scale });

  if (renderResult.errors.length > 0) {
    for (const err of renderResult.errors) {
      console.error(`Render error [${err.nodePath}]: ${err.message}`);
    }
  }
  console.log(`  Rendered ${String(renderResult.width)}x${String(renderResult.height)}`);

  // Step 3: Capture
  console.log("Stage 3/4: Capturing screenshot...");
  const { capture, captureUrl } = await import("@figma-dsl/comparator");
  const capturePath = resolve(outDir, "capture.png");
  const viewport = parseViewport(values.viewport) ?? {
    width: renderResult.width,
    height: renderResult.height,
  };

  if (values.url) {
    await captureUrl(values.url, capturePath, { viewport, scale });
  } else if (values.component) {
    await capture(resolve(values.component), capturePath, { viewport, scale });
  } else {
    console.error("Pipeline requires --component or --url for capture stage");
    process.exit(2);
  }

  // Step 4: Compare
  console.log("Stage 4/4: Comparing...");
  const { compare } = await import("@figma-dsl/comparator");
  const diffPath = resolve(outDir, "diff.png");
  const failThreshold = values.threshold ? Number(values.threshold) : 95;
  const compareResult = compare(renderPath, capturePath, diffPath, { failThreshold });

  console.log(`  Similarity: ${compareResult.similarity.toFixed(2)}%`);
  console.log(`  Result: ${compareResult.passed ? "PASS" : "FAIL"}`);

  if (!compareResult.passed) {
    process.exit(1);
  }
}

async function runExport(args: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      output: { type: "string", short: "o" },
      page: { type: "string" },
    },
    allowPositionals: true,
  });

  const dslPath = positionals[0];
  if (!dslPath) {
    console.error("Usage: figma-dsl export <dsl-file> -o output.json [--page 'Page Name']");
    process.exit(2);
  }

  const { compile, generatePluginInput, writePluginInput } = await import("@figma-dsl/core");
  const mod = await import(resolve(dslPath)) as Record<string, unknown>;
  const dslNode = mod["default"] ?? mod["component"];

  const compiled = compile(dslNode as import("@figma-dsl/core").DslNode);
  const pluginInput = generatePluginInput(compiled, values.page);
  const outputPath = values.output ?? "plugin-input.json";
  writePluginInput(pluginInput, outputPath);

  console.log(`Exported ${String(pluginInput.components.length)} components to ${outputPath}`);
}

async function runDoctor(): Promise<void> {
  let allOk = true;

  // Check Node.js version
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split(".")[0]!, 10);
  if (major >= 22) {
    console.log(`Node.js ${nodeVersion} - OK`);
  } else {
    console.log(`Node.js ${nodeVersion} - FAIL (requires 22+)`);
    allOk = false;
  }

  // Check @napi-rs/canvas
  try {
    await import("@napi-rs/canvas");
    console.log("@napi-rs/canvas - OK");
  } catch {
    console.log("@napi-rs/canvas - FAIL");
    allOk = false;
  }

  // Check Playwright (optional dependency)
  try {
    const pw = "playwright";
    await import(pw);
    console.log("Playwright - OK");
  } catch {
    console.log("Playwright - NOT AVAILABLE (optional, needed for capture)");
  }

  // Check Inter fonts
  try {
    const { FONTS_DIR } = await import("@figma-dsl/core");
    if (existsSync(resolve(FONTS_DIR, "Inter-Regular.otf"))) {
      console.log("Inter fonts - OK");
    } else {
      console.log("Inter fonts - FAIL");
      allOk = false;
    }
  } catch {
    console.log("Inter fonts - FAIL");
    allOk = false;
  }

  if (!allOk) {
    process.exit(2);
  }
}

function parseViewport(viewport: string | undefined): { width: number; height: number } | undefined {
  if (!viewport) return undefined;
  const [w, h] = viewport.split("x").map(Number);
  if (!w || !h) return undefined;
  return { width: w, height: h };
}

function printUsage(): void {
  console.log(`figma-dsl - Figma Component DSL Pipeline

Commands:
  compile <dsl-file> [-o output.json]       Compile DSL to CompiledNode JSON
  render  <dsl-file> -o output.png          Compile and render to PNG
  capture <component> -o output.png         Capture React component screenshot
  compare <img1> <img2> [-o diff.png]       Compare two images
  pipeline <dsl-file> --component <path>    Full pipeline: compile > render > capture > compare
  export  <dsl-file> -o output.json         Export plugin input JSON
  doctor                                    Check environment requirements
`);
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(2);
});
