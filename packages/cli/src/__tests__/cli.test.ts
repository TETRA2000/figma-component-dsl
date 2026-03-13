import { describe, it, expect } from 'vitest';
import { main, doctorCommand, pipelineCommand, EXIT_SUCCESS, EXIT_RUNTIME_ERROR, EXIT_PIPELINE_FAILURE } from '../cli.js';

describe('CLI', () => {
  it('shows help with no arguments', async () => {
    const result = await main([]);
    expect(result).toBe(EXIT_SUCCESS);
  });

  it('shows help for unknown command', async () => {
    const result = await main(['unknown']);
    expect(result).toBe(EXIT_SUCCESS);  // help is shown
  });

  it('doctor command runs without crashing', async () => {
    const result = await doctorCommand();
    // May fail if Node < 22, but should not crash
    expect(typeof result).toBe('number');
  });

  it('compile returns error when no input file', async () => {
    const result = await main(['compile']);
    expect(result).toBe(2);  // EXIT_RUNTIME_ERROR
  });

  it('render returns error when no input file', async () => {
    const result = await main(['render']);
    expect(result).toBe(2);
  });

  it('capture returns error when no URL', async () => {
    const result = await main(['capture']);
    expect(result).toBe(2);
  });

  it('compare returns error when no images', async () => {
    const result = await main(['compare']);
    expect(result).toBe(2);
  });

  it('export returns error when no input file', async () => {
    const result = await main(['export']);
    expect(result).toBe(2);
  });

  it('doctor command returns a number (exit code)', async () => {
    const result = await doctorCommand();
    expect(typeof result).toBe('number');
    // Should be EXIT_SUCCESS or EXIT_PIPELINE_FAILURE
    expect([EXIT_SUCCESS, EXIT_PIPELINE_FAILURE]).toContain(result);
  });

  it('pipeline command returns EXIT_RUNTIME_ERROR when no input file', async () => {
    const result = await pipelineCommand([]);
    expect(result).toBe(EXIT_RUNTIME_ERROR);
  });

  it('pipeline command returns EXIT_RUNTIME_ERROR for non-existent DSL file', async () => {
    const result = await pipelineCommand(['/tmp/nonexistent-pipeline-test.dsl.ts']);
    expect(result).toBe(EXIT_RUNTIME_ERROR);
  });

  it('pipeline command accepts --dsl, --url, --output, --threshold flags', async () => {
    // Should fail at compile stage (non-existent file), not at arg parsing
    const result = await pipelineCommand([
      '/tmp/nonexistent.dsl.ts',
      '--url', 'http://localhost:3000',
      '--output', '/tmp/pipeline-out',
      '--threshold', '0.90',
    ]);
    expect(result).toBe(EXIT_RUNTIME_ERROR);
  });

  it('compile command with non-existent file returns EXIT_RUNTIME_ERROR', async () => {
    const result = await main(['compile', '/tmp/nonexistent-file-12345.dsl.ts']);
    expect(result).toBe(EXIT_RUNTIME_ERROR);
  });

  it('render command with non-existent file returns EXIT_RUNTIME_ERROR', async () => {
    const result = await main(['render', '--input', '/tmp/nonexistent-file-12345.json']);
    expect(result).toBe(EXIT_RUNTIME_ERROR);
  });
});
