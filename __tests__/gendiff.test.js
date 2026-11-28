import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'

import { expect, test } from 'vitest'

import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename)
const readFile = (filename) => readFileSync(filename, 'utf-8')

test('gendiff flat json - stylish', () => {
	const file1Path = getFixturePath('file1.json')
	const file2Path = getFixturePath('file2.json')

	const expectedFile = getFixturePath('expected_stylish.txt')
	const expected = readFile(expectedFile)

	expect(genDiff(file1Path, file2Path)).toEqual(expected)
})

test('gendiff flat yaml - stylish', () => {
	const file1Path = getFixturePath('file1.yaml')
	const file2Path = getFixturePath('file2.yaml')

	const expectedFile = getFixturePath('expected_stylish.txt')
	const expected = readFile(expectedFile)

	expect(genDiff(file1Path, file2Path)).toEqual(expected)
})
