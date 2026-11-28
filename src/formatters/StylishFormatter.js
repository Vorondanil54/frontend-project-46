import { styleText } from 'node:util'

const mapping = {
	added: (node) => `  ${styleText(['green', 'bold'], '+')} ${styleText('greenBright', `${node.key}: ${node.value}`)}`,
	deleted: (node) => `  ${styleText(['red', 'bold'], '-')} ${styleText('redBright', `${node.key}: ${node.value}`)}`,
	unchanged: (node) => `    ${node.key}: ${node.value}`,
	changed: (node) => [
		`  ${styleText(['red', 'bold'], '-')} ${styleText('yellow', `${node.key}:`)} ${styleText('redBright', `${node.oldValue}`)}`,
		`  ${styleText(['green', 'bold'], '+')} ${styleText('yellow', `${node.key}:`)} ${styleText('greenBright', `${node.newValue}`)}`
	].join('\n')
}

export default class StylishFormatter {
	format(diff) {
		const lines = diff.map((node) => mapping[node.type](node))
		return `{\n${lines.join('\n')}\n}`
	}
}
