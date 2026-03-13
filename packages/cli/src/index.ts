#!/usr/bin/env node
// @figma-dsl/cli — Pipeline orchestration CLI
export { main, compileCommand, renderCommand, captureCommand, compareCommand, exportCommand, doctorCommand } from './cli.js';
export { EXIT_SUCCESS, EXIT_PIPELINE_FAILURE, EXIT_RUNTIME_ERROR } from './cli.js';

import { main } from './cli.js';
main().then((code) => process.exit(code));
