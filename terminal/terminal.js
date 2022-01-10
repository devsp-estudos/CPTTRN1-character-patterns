process.stdin.setEncoding('utf8')

process.stdin.on('readable', () => {
  let chunk

  while ((chunk = process.stdin.read()) !== null) {
    const dataToChessboard = generateDataToChessboard(chunk)

    const chessboards = generateChessboards(dataToChessboard)

    process.stdout.write(chessboards)
  }
})

function generateDataToChessboard(data) {
  const [quantityTestCases, ...arrayLines] = data.split('\n')

  const arrayTestCases = arrayLines
    .filter(string => string !== '')
    .map(string => {
      const [lines, columns] = string.split(' ')

      return {
        lines,
        columns,
      }
    })

  const arrayTestCasesSlice = arrayTestCases.slice(0, quantityTestCases)

  return arrayTestCasesSlice
}

function generateChessboard(lines, columns) {
  const arrayLines = [...Array(Number(lines))].map((_, idxLine) => {
    const asteriskIsFirstCharacter = idxLine % 2 == 0
    let character = asteriskIsFirstCharacter ? '*' : '.'

    const arrayColumns = [...Array(Number(columns))].map(_ => {
      const currentCharacter = character
      character = character === '*' ? '.' : '*'

      return currentCharacter
    })

    return arrayColumns.join('')
  })

  return arrayLines.join('\n')
}

function generateChessboards(data) {
  const chessboards = data.map(({ lines, columns }) => generateChessboard(lines, columns))
  return chessboards.join('\n\n')
}
