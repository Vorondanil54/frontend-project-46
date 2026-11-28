import StylishFormatter from './StylishFormatter.js'

export default class FormatterFactory {
	static create(formatName) {
		switch (formatName) {
			case 'stylish':
				return new StylishFormatter()
			default:
				throw new Error(`Unknown format: ${formatName}`)
		}
	}
}
