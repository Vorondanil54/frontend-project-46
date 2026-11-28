import { readFileSync } from 'node:fs'
import path from 'node:path'

import { load } from 'js-yaml'

export default class FileParser {
	static parse(filePath) {
		const fullPath = path.resolve(filePath)
		const fileContent = readFileSync(fullPath)
		const fileExtension = path.extname(filePath).slice(1)

		switch (fileExtension) {
			case 'json':
				return JSON.parse(fileContent)
			case 'yml':
			case 'yaml':
				return load(fileContent)
			default:
				throw new Error(`Unsupported file format: ${fileExtension}`)
		}
	}
}
