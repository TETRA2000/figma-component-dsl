"""Verify the figma_component_dsl package is importable."""


def test_import_package():
    import figma_component_dsl

    assert figma_component_dsl.__version__ == "0.1.0"
