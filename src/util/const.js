

export const blockType = {
  A: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  B: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  C: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  D: [
    [1, 1, 1, 1]
  ],
  E: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  F: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  G: [
    [1, 1],
    [1, 1]
  ]
}

export const blockTypeKeys = Object.keys(blockType)

export const randomType = blockTypeKeys[Math.floor(blockTypeKeys.length * Math.random())]

export const emptyLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export const solidLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export const emptyGrid = (function() {
  const grid = []
  for (let i = 0; i < 20; i++) {
    grid.push(emptyLine)
  }
  return grid
})()

export const speedArray = [8, 6, 5, 4, 2, 1]

export const delayArray = [40, 50, 60, 70, 80, 90]
