import FileParser from './FileParser.js'
import DiffBuilder from './DiffBuilder.js'
import FormatterFactory from './formatters/FormatterFactory.js'

export default function genDiff(firstFilePath, secondFilePath, format = 'stylish') {
	const data1 = FileParser.parse(firstFilePath)
	const data2 = FileParser.parse(secondFilePath)

	const diffTree = DiffBuilder.build(data1, data2)
	const formatter = FormatterFactory.create(format)

	return formatter.format(diffTree)
}
