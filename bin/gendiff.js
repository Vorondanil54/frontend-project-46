#!/usr/bin/env node

import { Command } from 'commander'

import genDiff from '../src/gendiff.js'

const program = new Command()

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')

program.parse(process.argv)
