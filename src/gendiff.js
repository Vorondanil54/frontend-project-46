import { readFileSync } from 'node:fs'
import path from 'node:path'

import { styleText } from 'node:util'

import _ from 'lodash'

const getData = (filePath) => {
	const fullPath = path.resolve(filePath)
	const fileContent = readFileSync(fullPath)
	return JSON.parse(fileContent)
}

const buildDiff = (data1, data2) => {
	const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

	return keys.map((key) => {
		if (!Object.hasOwn(data1, key)) {
			return { key, type: 'added', value: data2[key] }
		}
		if (!Object.hasOwn(data2, key)) {
			return { key, type: 'deleted', value: data1[key] }
		}
		if (data1[key] !== data2[key]) {
			return {
				key,
				type: 'changed',
				oldValue: data1[key],
				newValue: data2[key]
			}
		}

		return { key, type: 'unchanged', value: data1[key] }
	})

}

const formatDiff = (diff) => {
	const lines = diff.map((node) => {
		switch (node.type) {
			case 'added':
				return `  ${styleText(['green', 'bold'], '+')} ${styleText('greenBright', `${node.key}: ${node.value}`)}`
			case 'deleted':
				return `  ${styleText(['red', 'bold'], '-')} ${styleText('redBright', `${node.key}: ${node.value}`)}`
			case 'unchanged':
				return `    ${node.key}: ${node.value}`
			case 'changed':
				return [
					`  ${styleText(['red', 'bold'], '-')} ${styleText('yellow', `${node.key}:`)} ${styleText('redBright', `${node.oldValue}`)}`,
					`  ${styleText(['green', 'bold'], '+')} ${styleText('yellow', `${node.key}:`)} ${styleText('greenBright', `${node.newValue}`)}`
				].join('\n')
			default:
				throw new Error(`Unknown node type: ${node.type}`)
		}
	})

	return `{\n${lines.join('\n')}\n}`
}

function genDiff(firstFilePath, secondFilePath) {
	const data1 = getData(firstFilePath)
	const data2 = getData(secondFilePath)

	const diffTree = buildDiff(data1, data2)

	return formatDiff(diffTree)
}

export default genDiff
