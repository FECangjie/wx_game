import BackGround from './runtime/background'
import DataBus from './databus'
import Player from './player/index'
import Stone from './stone/index'
import GameInfo from './runtime/gameinfo'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

// 游戏主函数
export default class Main {
  constructor() {
    this.restart();
  }
  restart() {
    databus.reset();

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()

    this.player1 = new Player(1);
    this.player2 = new Player(2, 'images/boy.gif');
    this.stone = new Stone();

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas,
    )

  }

  //游戏结束后的触摸事件
  touchEventHandler(e) {
    e.preventDefault();
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArean
    this.restart();
  }

  // 碰撞
  collisionDetection() {
    if (this.stone.isCollideWith(this.player1)) {
      this.stone.x += 10
    } else if (this.stone.isCollideWith(this.player2)) {
      this.stone.x -= 10
    }
  }

  /**
   * 超过界限
   */
  overCenter() {
    if (this.stone.x + this.stone.width < window.innerWidth / 2) {
      databus.winner = '玩家一'
      databus.gameOver = true
    } else if (this.stone.x - this.stone.width > window.innerWidth / 2) {
      databus.winner = '玩家二'
      databus.gameOver = true
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx)

    this.player1.drawToCanvas(ctx)
    this.player2.drawToCanvas(ctx)
    this.stone.drawToCanvas(ctx)
  }

  // 游戏逻辑数据更新
  update(player) {
    const flag = player.y > this.stone.y - player.height && player.y < this.stone.y + this.stone.height
    player.update(flag ? this.stone.x : undefined)

    const num = Math.random(10)
    if (player.player === 1 && num * 10 < 0.5) {
      player.touched = true
    }

    //碰撞检测
    this.collisionDetection()
    this.overCenter()
  }

  loop() {
    this.update(this.player1)
    this.update(this.player2)
    this.render()

    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.winner)

      this.touchHandler = this.touchEventHandler.bind(this)
      canvas.addEventListener('touchstart', this.touchHandler)

      return
    }

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}
