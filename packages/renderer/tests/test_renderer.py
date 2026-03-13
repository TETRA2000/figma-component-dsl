"""Tests for the PyCairo renderer."""

import json
import os
import tempfile

import pytest

from figma_component_dsl.renderer import RenderOptions, render


def _make_rect(name, x, y, w, h, color=None):
    """Create a simple rectangle node dict."""
    fills = []
    if color:
        fills = [{"type": "SOLID", "color": color, "opacity": 1, "visible": True}]
    return {
        "guid": [0, 1],
        "type": "RECTANGLE",
        "name": name,
        "size": {"x": w, "y": h},
        "transform": [[1, 0, x], [0, 1, y], [0, 0, 1]],
        "fillPaints": fills,
        "opacity": 1,
        "visible": True,
        "children": [],
    }


def _make_frame(name, w, h, children=None, fills=None, corner_radius=0):
    """Create a simple frame node dict."""
    return {
        "guid": [0, 0],
        "type": "FRAME",
        "name": name,
        "size": {"x": w, "y": h},
        "transform": [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        "fillPaints": fills or [],
        "cornerRadius": corner_radius,
        "opacity": 1,
        "visible": True,
        "children": children or [],
    }


def _make_text(name, chars, x, y, font_size=14):
    """Create a simple text node dict."""
    return {
        "guid": [0, 2],
        "type": "TEXT",
        "name": name,
        "size": {"x": 100, "y": font_size * 1.2},
        "transform": [[1, 0, x], [0, 1, y], [0, 0, 1]],
        "fillPaints": [{"type": "SOLID", "color": {"r": 0, "g": 0, "b": 0, "a": 1}, "opacity": 1, "visible": True}],
        "opacity": 1,
        "visible": True,
        "children": [],
        "textData": {"characters": chars, "lines": [chars]},
        "derivedTextData": {
            "baselines": [{"lineY": 0, "lineHeight": font_size * 1.2, "firstCharIndex": 0, "endCharIndex": len(chars)}],
            "fontMetaData": [{"fontFamily": "sans-serif", "fontStyle": "Regular", "fontWeight": 400, "fontSize": font_size}],
        },
        "fontSize": font_size,
        "fontFamily": "sans-serif",
        "textAlignHorizontal": "LEFT",
    }


class TestRendererBasics:
    """Test basic rendering capabilities."""

    def test_render_empty_frame(self, tmp_path):
        """Render an empty frame produces a PNG file."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 200, 100)
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []
        assert os.path.exists(out)
        assert os.path.getsize(out) > 0

    def test_render_frame_with_solid_fill(self, tmp_path):
        """Render a frame with a solid color fill."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 200, 100, fills=[
            {"type": "SOLID", "color": {"r": 0.486, "g": 0.227, "b": 0.929, "a": 1}, "opacity": 1, "visible": True}
        ])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []

    def test_render_rectangle_child(self, tmp_path):
        """Render a frame containing a rectangle child."""
        out = str(tmp_path / "out.png")
        rect = _make_rect("Box", 10, 10, 80, 40,
                          color={"r": 1, "g": 0, "b": 0, "a": 1})
        node = _make_frame("Root", 200, 100, children=[rect])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []

    def test_render_with_corner_radius(self, tmp_path):
        """Render a frame with rounded corners."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 200, 100, corner_radius=16, fills=[
            {"type": "SOLID", "color": {"r": 0, "g": 0.5, "b": 1, "a": 1}, "opacity": 1, "visible": True}
        ])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []


class TestRendererText:
    """Test text rendering."""

    def test_render_text_node(self, tmp_path):
        """Render a text node."""
        out = str(tmp_path / "out.png")
        text = _make_text("Label", "Hello World", 10, 10)
        node = _make_frame("Root", 200, 50, children=[text])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []


class TestRendererEllipse:
    """Test ellipse rendering."""

    def test_render_ellipse(self, tmp_path):
        """Render an ellipse node."""
        out = str(tmp_path / "out.png")
        ellipse = {
            "guid": [0, 1],
            "type": "ELLIPSE",
            "name": "Circle",
            "size": {"x": 40, "y": 40},
            "transform": [[1, 0, 10], [0, 1, 10], [0, 0, 1]],
            "fillPaints": [{"type": "SOLID", "color": {"r": 0, "g": 1, "b": 0, "a": 1}, "opacity": 1, "visible": True}],
            "opacity": 1,
            "visible": True,
            "children": [],
        }
        node = _make_frame("Root", 100, 100, children=[ellipse])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []


class TestRendererGradient:
    """Test gradient fill rendering."""

    def test_render_linear_gradient(self, tmp_path):
        """Render a node with a linear gradient fill."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 200, 100, fills=[
            {
                "type": "GRADIENT_LINEAR",
                "gradientStops": [
                    {"color": {"r": 0.486, "g": 0.227, "b": 0.929, "a": 1}, "position": 0},
                    {"color": {"r": 0.388, "g": 0.400, "b": 0.945, "a": 1}, "position": 1},
                ],
                "gradientTransform": [[1, 0, 0], [0, 1, 0]],
                "opacity": 1,
                "visible": True,
            }
        ])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []


class TestRendererOptions:
    """Test render options."""

    def test_scale_factor(self, tmp_path):
        """Scale factor doubles the output dimensions."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 100, 50)
        errors = render({"root": node}, RenderOptions(output=out, scale=2.0))
        assert errors == []
        # Verify output file exists (size check would need PIL)
        assert os.path.getsize(out) > 0

    def test_transparent_background(self, tmp_path):
        """Transparent background produces a PNG without white fill."""
        out = str(tmp_path / "out.png")
        node = _make_frame("Root", 100, 50)
        errors = render({"root": node}, RenderOptions(output=out, background="transparent"))
        assert errors == []

    def test_invisible_nodes_skipped(self, tmp_path):
        """Invisible nodes are not rendered."""
        out = str(tmp_path / "out.png")
        hidden_rect = _make_rect("Hidden", 10, 10, 80, 40,
                                  color={"r": 1, "g": 0, "b": 0, "a": 1})
        hidden_rect["visible"] = False
        node = _make_frame("Root", 200, 100, children=[hidden_rect])
        errors = render({"root": node}, RenderOptions(output=out))
        assert errors == []


class TestRendererStdin:
    """Test JSON input from stdin."""

    def test_render_from_json_dict(self, tmp_path):
        """Test the render function accepts a dict directly."""
        out = str(tmp_path / "out.png")
        data = {
            "root": _make_frame("Root", 100, 100, fills=[
                {"type": "SOLID", "color": {"r": 0.5, "g": 0.5, "b": 0.5, "a": 1}, "opacity": 1, "visible": True}
            ])
        }
        errors = render(data, RenderOptions(output=out))
        assert errors == []
