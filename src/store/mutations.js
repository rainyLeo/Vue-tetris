import Block from '../util/block.js'
import { emptyGrid } from '../util/const'

export const state = {
  current: {
    type: null,
    timeStamp: null,
    shape: null,
    x: null,
    y: null,

  },
  nextType: null,
  grid: JSON.parse(JSON.stringify(emptyGrid)),
  speed: 1,
  score: 10,
  maxScore: 0,
  lock: false,
  pause: false
}

function initBlock() {
  let block = new Block({ type: state.nextType })
  console.log('block', block)
  ;({
    type: state.current.type,
    shape: state.current.shape,
    x: state.current.x,
    y: state.current.y,
    timeStamp: state.current.timeStamp,
  } = block)
  state.nextType = block.nextType
}

initBlock()

function putBottom() {
  let shape = state.current.shape
  let x = state.current.x
  let y = state.current.y
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j] === 1) {
          state.grid[x + i][y + j] = 1
        }
      }
    }
}

function stop() {
  if (state.current.x + state.current.shape.length === 20) {
    return true
  }
  return false
}

export const mutations = {
  moveLeft(state) {
    if (state.current.y > 0) {
      state.current.y -= 1
    }
  },
  moveRight(state) {
    if (state.current.y + state.current.shape[0].length < 10) {
      state.current.y += 1
    }
  },
  moveBottom(state) {
    if (state.current.x + state.current.shape.length < 20) {
      state.current.x += 1
      console.log('grid: x', state.grid, state.current.x)
      if (stop()) {
        putBottom()
        initBlock()
      }
    }
  },
  rotate(state) {
    let result = []
    let shape = state.current.shape

    for (let i = 0; i < shape[0].length; i++) {
      let item = []
      for (let j = 0; j < shape.length; j++) {
        item[j] = shape[j][i]
      }
      result.push(item)
    }
    state.current.shape = result.reverse()

    if (state.current.type === 'D') {
      if (state.current.shape[0].length === 4) {
        ;[state.current.x, state.current.y] = [state.current.x - 1, state.current.y + 1]
      } else {
        ;[state.current.x, state.current.y] = [state.current.x + 1, state.current.y - 1]
      }
    }
  }
}
