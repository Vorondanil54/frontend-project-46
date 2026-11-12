import { readFileSync } from 'node:fs'
import path from 'node:path'

function genDiff(firstFilePath, secondFilePath) {
	const firstFullFilePath = path.resolve(firstFilePath)
	const secondFullFilePath = path.resolve(secondFilePath) 

	const firstRawFile = readFileSync(firstFullFilePath)
	const secondRawFile = readFileSync(secondFullFilePath)

	const firstParsedFile = JSON.parse(firstRawFile)
	const secondParsedFile = JSON.parse(secondRawFile)

	return (`${firstParsedFile} ${secondParsedFile}`)
}

export default genDiff
