import { emptyLine } from './const'

export function isBottomAvailable(state) {
  let { shape, x, y } = state.current

  if (x + shape.length > 19) {
    return false
  }

  const nextLine = []
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1 && x + i + 1 < 20) {
        nextLine.push([x + i + 1, y + j])
      }
    }
  }

  return !(nextLine.some(e => state.grid[e[0]][e[1]] === 1))
}

export function putBottom(state) {
  let { shape, x, y } = state.current

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (state.current.shape[i][j] === 1) {
        state.grid[x + i][y + j] = 1
      }
    }
  }
}

export function isLeftAvailable(state) {
  let { shape, x, y } = state.current

  if (y < 1) {
    return false
  }

  const leftPosition = []
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1 && y - 1 >= 0) {
        leftPosition.push([x, y - 1])
      }
    }
  }

  return !(leftPosition.some(e => state.grid[e[0]][e[1]] === 1))
}

export function isRightAvailable(state) {
  let { shape, x, y } = state.current

  if (y + shape[0].length > 9) {
    return false
  }

  const rightPosition = []
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1 && y + 1 < 10) {
        rightPosition.push([x, y + 1])
      }
    }
  }

  return !(rightPosition.some(e => state.grid[e[0]][e[1]] === 1))
}

export function hasSolidLine(state) {
  for (let i = 0; i < state.grid.length; i++) {
    if (state.grid[i].every(e => e === 1)) {
      state.grid.splice(i, 1)
      state.grid.unshift(emptyLine)
    }
  }
}
