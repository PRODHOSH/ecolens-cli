#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { installCommand } from './commands/install.js';
import { optimizeCommand } from './commands/optimize.js';

const program = new Command();

program
  .name('ecolens')
  .description('EcoLens - Optimize image URLs with Cloudinary fetch')
  .version('1.1.0');

program
  .command('install')
  .description('Initialize EcoLens in the project')
  .action(async () => {
    try {
      await installCommand();
    } catch (error: any) {
      console.error(`\n${logSymbols.error} ${chalk.red('Error during installation:')}`);
      console.error(chalk.gray(error.message || error));
      process.exit(1);
    }
  });

program
  .command('optimize')
  .description('Scan and optimize image URLs in the repository')
  .action(async () => {
    try {
      await optimizeCommand();
    } catch (error: any) {
      console.error(`\n${logSymbols.error} ${chalk.red('Error during optimization:')}`);
      console.error(chalk.gray(error.message || error));
      process.exit(1);
    }
  });

program.parse();
