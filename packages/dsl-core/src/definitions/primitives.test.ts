import { describe, expect, it } from "vitest";
import {
  compile, frame, text, rectangle, ellipse, component, componentSet, instance,
  solid, gradient, hex, stroke,
  horizontal, vertical,
} from "../index.js";

describe("DSL component definitions — primitives", () => {
  it("Button: 4 styles × 3 sizes = 12 variants", () => {
    const styles = ["Primary", "Secondary", "Outline", "Ghost"] as const;
    const sizes = ["Small", "Medium", "Large"] as const;
    const sizeConfig = {
      Small: { padX: 12, padY: 6, fontSize: 12 },
      Medium: { padX: 16, padY: 8, fontSize: 14 },
      Large: { padX: 24, padY: 12, fontSize: 16 },
    } as const;

    const variants = [];
    for (const style of styles) {
      for (const size of sizes) {
        const cfg = sizeConfig[size];
        const fills = style === "Primary"
          ? [gradient([{ hex: "#7c3aed", position: 0 }, { hex: "#4f46e5", position: 1 }], 135)]
          : style === "Secondary"
          ? [solid("#e5e7eb")]
          : style === "Outline"
          ? []
          : [];
        const textColor = style === "Primary" ? "#ffffff" : "#111827";
        const strokes = style === "Outline"
          ? [{ color: hex("#d1d5db"), weight: 1 }]
          : undefined;

        variants.push(
          component(`Style=${style}, Size=${size}`, {
            autoLayout: horizontal({
              padX: cfg.padX,
              padY: cfg.padY,
              align: "CENTER",
              counterAlign: "CENTER",
            }),
            fills,
            strokes,
            cornerRadius: 9999,
            children: [text("Button", { fontSize: cfg.fontSize, fontWeight: 500, color: textColor })],
          }),
        );
      }
    }

    const tree = componentSet("Button", {
      size: { x: 800, y: 400 },
      children: variants,
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    expect(compiled.nodeCount).toBeGreaterThan(24); // 12 variants × 2+ nodes each
  });

  it("Badge: 4 variants", () => {
    const badgeVariants = [
      { name: "Variant=Default", bg: "#f3f4f6", border: "#e5e7eb", text: "#374151" },
      { name: "Variant=Primary", bg: "#ede9fe", border: "#c4b5fd", text: "#7c3aed" },
      { name: "Variant=Success", bg: "#d1fae5", border: "#6ee7b7", text: "#059669" },
      { name: "Variant=Warning", bg: "#fef3c7", border: "#fcd34d", text: "#d97706" },
    ];

    const variants = badgeVariants.map((v) =>
      component(v.name, {
        autoLayout: horizontal({ padX: 12, padY: 6, align: "CENTER", counterAlign: "CENTER" }),
        fills: [solid(v.bg)],
        strokes: [{ color: hex(v.border), weight: 1 }],
        cornerRadius: 9999,
        componentProperties: [
          { name: "label", type: "TEXT", defaultValue: "Badge" },
        ],
        children: [text("Badge", { fontSize: 12, fontWeight: 500, color: v.text })],
      }),
    );

    const tree = componentSet("Badge", {
      size: { x: 400, y: 200 },
      children: variants,
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("FeatureCard: vertical card layout", () => {
    const tree = component("FeatureCard", {
      size: { x: 320, y: 200 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid("#ffffff")],
      strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
      cornerRadius: 16,
      componentProperties: [
        { name: "title", type: "TEXT", defaultValue: "Feature" },
        { name: "icon", type: "INSTANCE_SWAP", defaultValue: "IconPlaceholder" },
      ],
      children: [
        frame("IconContainer", {
          size: { x: 48, y: 48 },
          fills: [solid("#ede9fe")],
          cornerRadius: 12,
          autoLayout: horizontal({ align: "CENTER", counterAlign: "CENTER" }),
          children: [
            rectangle("IconPlaceholder", { size: { x: 24, y: 24 }, fills: [solid("#7c3aed")] }),
          ],
        }),
        text("Feature Title", { fontSize: 18, fontWeight: 600 }),
        text("Description text goes here for the feature card.", {
          fontSize: 14,
          color: "#6b7280",
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    expect(compiled.root.type).toBe("COMPONENT");
  });

  it("TestimonialCard: 3 rating variants with stars", () => {
    function stars(count: number) {
      return Array.from({ length: 5 }, (_, i) =>
        ellipse(`Star${String(i + 1)}`, {
          size: { x: 16, y: 16 },
          fills: i < count ? [solid("#fbbf24")] : [solid("#d1d5db")],
        }),
      );
    }

    const variants = [3, 4, 5].map((rating) =>
      component(`Rating=${String(rating)}`, {
        size: { x: 320, y: 240 },
        autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
        fills: [solid("#ffffff")],
        strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
        cornerRadius: 16,
        children: [
          frame("Stars", {
            autoLayout: horizontal({ spacing: 4 }),
            children: stars(rating),
          }),
          text('"This product changed my workflow completely."', {
            fontSize: 14,
            color: "#374151",
            lineHeight: { value: 165, unit: "PERCENT" },
          }),
          frame("Author", {
            autoLayout: horizontal({ spacing: 12, counterAlign: "CENTER" }),
            children: [
              ellipse("Avatar", {
                size: { x: 40, y: 40 },
                fills: [solid("#e5e7eb")],
              }),
              frame("AuthorInfo", {
                autoLayout: vertical({ spacing: 2 }),
                children: [
                  text("Jane Doe", { fontSize: 14, fontWeight: 600 }),
                  text("Product Manager", { fontSize: 12, color: "#6b7280" }),
                ],
              }),
            ],
          }),
        ],
      }),
    );

    const tree = componentSet("TestimonialCard", {
      size: { x: 1000, y: 300 },
      children: variants,
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("PricingCard: standard + highlighted variants", () => {
    function pricingCard(highlighted: boolean) {
      const bgFills = highlighted
        ? [gradient([{ hex: "#1e1b4b", position: 0 }, { hex: "#312e81", position: 1 }], 135)]
        : [solid("#ffffff")];
      const textColor = highlighted ? "#ffffff" : "#111827";
      const priceColor = highlighted ? "#ffffff" : "#7c3aed";

      return component(`Highlighted=${String(highlighted)}`, {
        size: { x: 320, y: 480 },
        autoLayout: vertical({ spacing: 24, padX: 24, padY: 32 }),
        fills: bgFills,
        cornerRadius: 24,
        strokes: highlighted ? [] : [{ color: hex("#e5e7eb"), weight: 1 }],
        children: [
          text("Pro Plan", { fontSize: 20, fontWeight: 600, color: textColor }),
          text("$49/mo", { fontSize: 36, fontWeight: 700, color: priceColor }),
          rectangle("Divider", { size: { x: 272, y: 1 }, fills: [solid(highlighted ? "#4338ca" : "#e5e7eb")] }),
          frame("Features", {
            autoLayout: vertical({ spacing: 12 }),
            children: [
              frame("Feature1", {
                autoLayout: horizontal({ spacing: 8, counterAlign: "CENTER" }),
                children: [
                  ellipse("Check", { size: { x: 16, y: 16 }, fills: [solid("#10b981")] }),
                  text("Unlimited projects", { fontSize: 14, color: textColor }),
                ],
              }),
              frame("Feature2", {
                autoLayout: horizontal({ spacing: 8, counterAlign: "CENTER" }),
                children: [
                  ellipse("Check", { size: { x: 16, y: 16 }, fills: [solid("#10b981")] }),
                  text("Priority support", { fontSize: 14, color: textColor }),
                ],
              }),
            ],
          }),
          frame("CTA", {
            autoLayout: horizontal({ padX: 24, padY: 12, align: "CENTER", counterAlign: "CENTER" }),
            fills: highlighted ? [solid("#ffffff")] : [solid("#7c3aed")],
            cornerRadius: 9999,
            children: [
              text("Get Started", {
                fontSize: 14,
                fontWeight: 600,
                color: highlighted ? "#7c3aed" : "#ffffff",
              }),
            ],
          }),
        ],
      });
    }

    const tree = componentSet("PricingCard", {
      size: { x: 700, y: 500 },
      children: [pricingCard(false), pricingCard(true)],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("CTABanner: 3-stop gradient with button row", () => {
    const tree = component("CTABanner", {
      size: { x: 800, y: 300 },
      autoLayout: vertical({ spacing: 32, padX: 64, padY: 48, align: "CENTER", counterAlign: "CENTER" }),
      fills: [gradient([{ hex: "#4338ca", position: 0 }, { hex: "#7c3aed", position: 1 }], 135)],
      cornerRadius: 24,
      children: [
        text("Ready to get started?", { fontSize: 36, fontWeight: 700, color: "#ffffff" }),
        text("Join thousands of teams already using our platform.", {
          fontSize: 18,
          color: "#c4b5fd",
        }),
        frame("Buttons", {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame("PrimaryBtn", {
              autoLayout: horizontal({ padX: 24, padY: 12, align: "CENTER", counterAlign: "CENTER" }),
              fills: [solid("#ffffff")],
              cornerRadius: 9999,
              children: [text("Start Free Trial", { fontSize: 14, fontWeight: 600, color: "#7c3aed" })],
            }),
            frame("SecondaryBtn", {
              autoLayout: horizontal({ padX: 24, padY: 12, align: "CENTER", counterAlign: "CENTER" }),
              strokes: [{ color: hex("#ffffff"), weight: 1 }],
              cornerRadius: 9999,
              children: [text("Learn More", { fontSize: 14, fontWeight: 600, color: "#ffffff" })],
            }),
          ],
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    expect(compiled.root.type).toBe("COMPONENT");
  });
});
