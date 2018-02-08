import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const ONE_X_START = 0
const TWO_X_START = screenWidth - 160

export default class Player extends Sprite {
  constructor(player, PLAYER_IMG_SRC = 'images/girl.gif', PLAYER_WIDTH = 160, PLAYER_HEIGHT = 80) {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)
    this.initEvent()
    this.player = player
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
    this.x = player === 1 ? ONE_X_START : TWO_X_START
    this.y = 0
    this.motion = true
    this.touched = false // 触碰
    this.meet = false // 返回
  }

  // 事件初始化
  initEvent() {
    canvas.addEventListener('touchstart', (e => {
      if (e.touches[0].clientX > screenWidth / 2) {
        this.touched = true
      }
    }).bind(this))
  }

  /**
   * 英雄状态更新函数
   */
  update(end) {
    const player = this.player
    const x_end = !!end ? player === 1 ? end : end + 50 : screenWidth / 2
    const x_dt = player === 1 ? 10 : -10 // 运动矢量
    const point = player === 1 ? this.x + this.width : this.x // 触发点
    if (!this.touched) { // 常态 y轴循环
      if (this.motion) {
        if (this.y > window.innerHeight - this.height) {
          this.motion = false
        } else {
          this.y += 8
        }
      } else {
        if (this.y < 0) {
          this.motion = true
        } else {
          this.y -= 8
        }
      }
    } else { // 启动状态
      if (this.meet) { // 返回
        this.x -= x_dt
        if (player === 1 ? this.x <= ONE_X_START : this.x >= TWO_X_START) {
          this.x = player === 1 ? ONE_X_START : TWO_X_START
          this.touched = false
          this.meet = false
        }
      } else { // 终点
        this.x += x_dt
        if (player === 1 ? point >= x_end - 10 : point <= x_end + 10) {
          this.meet = true;
        }
      }
    }
  }
}
