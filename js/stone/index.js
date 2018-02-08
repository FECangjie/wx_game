import Sprite from '../base/sprite'
import DataBus from '../databus'


let screenWidth  = window.innerWidth
let screenHeight = window.innerHeight
let databus      = new DataBus()

const STONE_IMG_SRC = 'images/fengjie.jpg'
const STONE_WIDTH = 50
const STONE_HEIGHT = 50

export default class Stone extends Sprite{
    constructor() {
        super(STONE_IMG_SRC, STONE_WIDTH, STONE_HEIGHT)

        this.x = screenWidth / 2 - this.width / 2
        this.y = screenHeight - this.height - 200
    }

    /**
     * 碰撞检测
     */
    isCollideWith(sp) {
      let spX1 = sp.x
      let spX2 = sp.x + sp.width
      let spY1 = sp.y
      let spY2 = sp.y + sp.height
      let result = spX1 <= this.x && spX2 >= this.x

      result = result || spX1 <= this.x + this.width && spX2 >= this.x + this.width

      if (!result) {
        return false
      }

      result = spY1 <= this.y && spY2 >= this.y
      result = result || spY1 <= this.y + this.height && spY2 >= this.y + this.height
      result = result || spY1 >= this.y && spY1 <= this.y + this.height

      return result
    }

}
