import { styleText } from 'node:util'

export default class StylishFormatter {
	format(diff) {
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
}
