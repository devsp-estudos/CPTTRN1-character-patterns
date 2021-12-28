const containerMain = document.getElementById('containerMain')
const outputChessboard = document.getElementById('outputChessboard')
const containerTestCasesClassName = 'container-test-cases'

const generate = {
  testCases: (quantity) => {
    const arrayTestCasesComp = [...Array(quantity)].map((_, idx) => {
      const htmlTestCase = generate.compTestCase(idx)
      return htmlTestCase
    })

    return arrayTestCasesComp.join(" ")
  },

  compTestCase: (numberId) => {
    return `
      <div class="container-test-cases">
        <h3>Caso de teste - ${numberId + 1}</h3>

        <div class="container-input">
          <input id="case-l-${numberId}" placeholder="qnt. linhas" type="number">
          <input id="case-c-${numberId}" placeholder="qnt. colunas" type="number">
        </div>
      </div>
    `
  },

  dataToChessboard: () => {
    const quantityTestCases = document.getElementsByClassName(containerTestCasesClassName).length

    const data = [...Array(quantityTestCases)].map((_, idx) => {
      const lines = document.getElementById(`case-l-${idx}`).value
      const columns = document.getElementById(`case-c-${idx}`).value

      return {
        lines,
        columns,
      }
    })

    return data
  },

  chessboard: (lines, columns) => {
    const arrayLines = [...Array(Number(lines))].map((_, idxLine) => {
      const asteriskIsFirstCharacter = idxLine % 2 == 0
      let character = asteriskIsFirstCharacter ? "*" : "."

      const arrayColumns = [...Array(Number(columns))].map(_ => {
        const currentCharacter = character
        character = character === "*" ? "." : "*"

        return currentCharacter
      })

      return arrayColumns.join('')
    })

    return arrayLines.join('<br>')
  },

  htmlChessboard: (arrayChessboard) => {
    return arrayChessboard.reduce((acc, chessboard, idx) => {
      return acc += `
        Caso de teste - ${idx + 1}
        <br>
        <br>
        ${chessboard}
        <br>
        <br>
      `
    }, '<br>')
  }
}

function handleChangeQntTestCases(e) {
  const quantity = Number(e.value)

  if (quantity < 100) {
    const htmlTestCases = generate.testCases(quantity)
    containerMain.innerHTML = htmlTestCases
  }
  else {
    alert("Insira um valor menor que 100")
  }
}

function printChessboard() {
  const dataToChessboard = generate.dataToChessboard()

  const arrayChessboard = dataToChessboard.map(({ lines, columns }) => {
    const textChessboard = generate.chessboard(lines, columns)
    return textChessboard
  })

  const htmlChessboard = generate.htmlChessboard(arrayChessboard)

  outputChessboard.innerHTML = htmlChessboard
}
