import Block from '../util/block.js'
import { emptyGrid } from '../util/const'
import {
  putBottom,
  isBottomAvailable,
  isLeftAvailable,
  isRightAvailable,
  hasSolidLine
} from '../util/check'

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
  ;({
    type: state.current.type,
    shape: state.current.shape,
    x: state.current.x,
    y: state.current.y,
    timeStamp: state.current.timeStamp,
  } = block)
  state.nextType = block.nextType
  state.lock = false
}

initBlock()

export const mutations = {
  moveLeft(state) {
    if (isLeftAvailable(state)) {
      state.current.y -= 1
    }
  },

  moveRight(state) {
    if (isRightAvailable(state)) {
      state.current.y += 1
    }
  },

  moveBottom(state) {
    if (isBottomAvailable(state)) {
      state.current.x += 1
      if (!isBottomAvailable(state)) {
        putBottom(state)
        hasSolidLine(state)
        state.lock = true

        setTimeout(function() {
          initBlock()
        }, 10)
      }
    }
  },

  drop(state) {
    while (!state.lock) {
      mutations.moveBottom(state)
    }
  },

  rotate(state) {
    let result = []
    let { shape, x, y, type } = state.current

    for (let i = 0; i < shape[0].length; i++) {
      let item = []
      for (let j = 0; j < shape.length; j++) {
        item[j] = shape[j][i]
      }
      result.push(item)
    }

    if ((type !== 'D' && y + result[0].length > 10) ||
        (type === 'D' && y + result[0].length > 11)) {
      return
    }

    state.current.shape = result.reverse()

    if (type === 'D') {
      if (state.current.shape[0].length === 4) {
        ;[state.current.x, state.current.y] = [x + 1, y - 1]
      } else {
        ;[state.current.x, state.current.y] = [x - 1, y + 1]
      }
    }
  }
}
