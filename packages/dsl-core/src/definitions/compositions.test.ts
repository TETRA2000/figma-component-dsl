import { describe, expect, it } from "vitest";
import {
  compile, frame, text, rectangle, ellipse, component, componentSet, instance,
  solid, gradient, hex,
  horizontal, vertical,
} from "../index.js";

describe("DSL component definitions — page compositions", () => {
  it("Navbar: fixed-width with spacers", () => {
    const tree = frame("Navbar", {
      size: { x: 1200, y: 64 },
      autoLayout: horizontal({ padX: 24, counterAlign: "CENTER" }),
      fills: [solid("#ffffff")],
      strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
      children: [
        text("Logo", { fontSize: 20, fontWeight: 700, color: "#111827" }),
        frame("Spacer", { layoutGrow: 1 }),
        frame("NavLinks", {
          autoLayout: horizontal({ spacing: 32 }),
          children: [
            text("Features", { fontSize: 14, color: "#6b7280" }),
            text("Pricing", { fontSize: 14, color: "#6b7280" }),
            text("Docs", { fontSize: 14, color: "#6b7280" }),
          ],
        }),
        frame("Spacer2", { layoutGrow: 1 }),
        frame("CTA", {
          autoLayout: horizontal({ padX: 16, padY: 8, align: "CENTER", counterAlign: "CENTER" }),
          fills: [gradient([{ hex: "#7c3aed", position: 0 }, { hex: "#4f46e5", position: 1 }], 135)],
          cornerRadius: 9999,
          children: [text("Get Started", { fontSize: 14, fontWeight: 500, color: "#ffffff" })],
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    expect(compiled.root.size).toEqual({ x: 1200, y: 64 });
  });

  it("Hero: center-aligned with large text", () => {
    const tree = frame("Hero", {
      size: { x: 1200, y: 600 },
      autoLayout: vertical({ spacing: 24, padX: 200, padY: 120, align: "CENTER", counterAlign: "CENTER" }),
      fills: [solid("#ffffff")],
      children: [
        frame("Badge", {
          autoLayout: horizontal({ padX: 12, padY: 6 }),
          fills: [solid("#ede9fe")],
          cornerRadius: 9999,
          children: [text("New", { fontSize: 12, fontWeight: 500, color: "#7c3aed" })],
        }),
        text("Build faster with our platform", {
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: { value: -2.5, unit: "PIXELS" },
        }),
        text("The all-in-one solution for modern development teams.", {
          fontSize: 20,
          color: "#6b7280",
        }),
        frame("Buttons", {
          autoLayout: horizontal({ spacing: 16 }),
          children: [
            frame("Primary", {
              autoLayout: horizontal({ padX: 24, padY: 12 }),
              fills: [solid("#7c3aed")],
              cornerRadius: 9999,
              children: [text("Start Free", { fontSize: 14, fontWeight: 600, color: "#ffffff" })],
            }),
            frame("Secondary", {
              autoLayout: horizontal({ padX: 24, padY: 12 }),
              strokes: [{ color: hex("#d1d5db"), weight: 1 }],
              cornerRadius: 9999,
              children: [text("Learn More", { fontSize: 14, fontWeight: 600 })],
            }),
          ],
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("Stats: inline with dividers", () => {
    function stat(value: string, label: string) {
      return frame(`Stat-${label}`, {
        autoLayout: vertical({ spacing: 4, counterAlign: "CENTER" }),
        children: [
          text(value, { fontSize: 36, fontWeight: 700, color: "#7c3aed" }),
          text(label, { fontSize: 14, color: "#6b7280" }),
        ],
      });
    }

    function divider() {
      return rectangle("Divider", {
        size: { x: 1, y: 48 },
        fills: [solid("#e5e7eb")],
      });
    }

    const tree = frame("Stats", {
      size: { x: 800, y: 120 },
      autoLayout: horizontal({ spacing: 48, padX: 48, counterAlign: "CENTER", align: "CENTER" }),
      fills: [solid("#ffffff")],
      children: [
        stat("10K+", "Users"),
        divider(),
        stat("99.9%", "Uptime"),
        divider(),
        stat("24/7", "Support"),
        divider(),
        stat("50+", "Integrations"),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("Footer: dark theme, multi-column", () => {
    function linkColumn(title: string, links: string[]) {
      return frame(`Col-${title}`, {
        autoLayout: vertical({ spacing: 12 }),
        children: [
          text(title, { fontSize: 14, fontWeight: 600, color: "#ffffff" }),
          ...links.map((l) => text(l, { fontSize: 14, color: "#9ca3af" })),
        ],
      });
    }

    const tree = frame("Footer", {
      size: { x: 1200, y: 300 },
      autoLayout: vertical({ spacing: 48, padX: 48, padY: 48 }),
      fills: [solid("#030712")],
      children: [
        frame("TopSection", {
          autoLayout: horizontal({ spacing: 64 }),
          children: [
            linkColumn("Product", ["Features", "Pricing", "Changelog"]),
            linkColumn("Company", ["About", "Blog", "Careers"]),
            linkColumn("Support", ["Help Center", "Contact", "Status"]),
          ],
        }),
        rectangle("Divider", {
          size: { x: 1104, y: 1 },
          fills: [solid("#1f2937")],
        }),
        text("© 2024 Company. All rights reserved.", {
          fontSize: 14,
          color: "#6b7280",
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("FeatureGrid: component instances", () => {
    // Define FeatureCard component
    const featureCard = component("FeatureCard", {
      size: { x: 320, y: 200 },
      autoLayout: vertical({ spacing: 16, padX: 24, padY: 24 }),
      fills: [solid("#ffffff")],
      strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
      cornerRadius: 16,
      children: [
        rectangle("Icon", { size: { x: 24, y: 24 }, fills: [solid("#7c3aed")] }),
        text("Feature Title", { fontSize: 18, fontWeight: 600 }),
        text("Description", { fontSize: 14, color: "#6b7280" }),
      ],
    });

    const tree = frame("FeatureGrid", {
      size: { x: 1200, y: 600 },
      autoLayout: vertical({ spacing: 32, padX: 48, padY: 48 }),
      fills: [solid("#f9fafb")],
      children: [
        frame("Header", {
          autoLayout: vertical({ spacing: 8, counterAlign: "CENTER" }),
          children: [
            text("Features", { fontSize: 36, fontWeight: 700 }),
            text("Everything you need to build great products.", {
              fontSize: 18,
              color: "#6b7280",
            }),
          ],
        }),
        frame("Grid", {
          autoLayout: horizontal({ spacing: 24 }),
          children: [
            featureCard,
            instance("FeatureCard"),
            instance("FeatureCard"),
          ],
        }),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
    expect(compiled.nodeCount).toBeGreaterThan(5);
  });

  it("FAQ: vertically stacked items with borders", () => {
    function faqItem(question: string) {
      return frame(`FAQ-${question.slice(0, 20)}`, {
        size: { x: 720, y: 56 },
        autoLayout: horizontal({ padX: 24, padY: 16, counterAlign: "CENTER" }),
        strokes: [{ color: hex("#e5e7eb"), weight: 1 }],
        children: [
          text(question, { fontSize: 14, fontWeight: 500 }),
          frame("Spacer", { layoutGrow: 1 }),
          text("+", { fontSize: 20, color: "#6b7280" }),
        ],
      });
    }

    const tree = frame("FAQ", {
      size: { x: 720, y: 500 },
      autoLayout: vertical({ counterAlign: "CENTER" }),
      children: [
        frame("Header", {
          autoLayout: vertical({ spacing: 8, counterAlign: "CENTER" }),
          children: [
            text("Frequently Asked Questions", { fontSize: 30, fontWeight: 700 }),
            text("Find answers to common questions.", { fontSize: 16, color: "#6b7280" }),
          ],
        }),
        faqItem("What is your refund policy?"),
        faqItem("How do I cancel my subscription?"),
        faqItem("Can I change my plan later?"),
        faqItem("Do you offer enterprise pricing?"),
      ],
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });

  it("Container: width variant component", () => {
    const widths = [640, 768, 1024, 1200];
    const variants = widths.map((w) =>
      component(`Width=${String(w)}`, {
        size: { x: w, y: 100 },
        autoLayout: horizontal({ padX: 24 }),
      }),
    );

    const tree = componentSet("Container", {
      size: { x: 1300, y: 200 },
      children: variants,
    });

    const compiled = compile(tree);
    expect(compiled.errors).toEqual([]);
  });
});
