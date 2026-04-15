import { Command } from 'commander';
import { FizzBuzzService } from '@fizzbuzz/core-logic';

const program = new Command();
const fizzBuzzService = new FizzBuzzService();

program
  .name('fizzbuzz-core')
  .description('Core FizzBuzz CLI service')
  .version('0.1.0');

program
  .command('compute')
  .description('Compute FizzBuzz for a single number')
  .argument('<number>', 'number to compute')
  .action((number) => {
    const n = parseInt(number, 10);
    if (isNaN(n)) {
      console.error('Error: Please provide a valid number.');
      process.exit(1);
    }
    console.log(fizzBuzzService.compute(n));
  });

program
  .command('range')
  .description('Compute FizzBuzz for a range of numbers')
  .argument('<start>', 'start number')
  .argument('<end>', 'end number')
  .action((start, end) => {
    const s = parseInt(start, 10);
    const e = parseInt(end, 10);
    if (isNaN(s) || isNaN(e)) {
      console.error('Error: Please provide valid numbers for start and end.');
      process.exit(1);
    }
    const results = fizzBuzzService.computeRange(s, e);
    results.forEach((res, i) => {
      console.log(`${s + i}: ${res}`);
    });
  });

program.parse();
