import { blockType, blockTypeKeys } from './const'

export default class Block {
  constructor({ type }) {
    this.type = type || blockTypeKeys[Math.floor(blockTypeKeys.length * Math.random())]
    this.shape = blockType[this.type]
    this.nextType = blockTypeKeys[Math.floor(blockTypeKeys.length * Math.random())]
    this.timeStamp = Date.now()

    // 初始坐标, 方块左上角距离上框 x 距离左框 y
    if (this.type === 'D') {
      ;[this.x, this.y] = [0, 3]
    } else {
      ;[this.x, this.y] = [-1, 4]
    }
  }
}
