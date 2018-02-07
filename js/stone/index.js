import Sprite from '../base/sprite'
import DataBus from '../databus'

const STONE_IMG_SRC = 'images/test.png'
const STONE_WIDTH = 50;
const STONE_HEIGHT = 50;

let screenWidth  = window.innerWidth
let screenHeight = window.innerHeight
let databus      = new DataBus();


export default class Stone extends Sprite{
    constructor() {
        super(STONE_IMG_SRC, STONE_WIDTH, STONE_HEIGHT)

        this.x = screenWidth / 2 - this.width / 2
        this.y = screenHeight - this.height -30
    }

    //碰撞


}