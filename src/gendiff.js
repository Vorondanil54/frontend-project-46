import { readFileSync } from 'node:fs'
import path from 'node:path'

const getData = (filePath) => {
	const fullPath = path.resolve(filePath)
	const fileContent = readFileSync(fullPath)
	return JSON.parse(fileContent)
}

function genDiff(firstFilePath, secondFilePath) {
	const data1 = getData(firstFilePath)
	const data2 = getData(secondFilePath)

	return (`${data1} ${data2}`)
}

export default genDiff
