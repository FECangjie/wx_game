import Animation from '../base/animation'
import DataBus from '../databus'
import Sprite from '../base/sprite'

const BUFF_IMG_SRC = 'images/buffBigger.png';
const BUFF_WIDTH = 40;
const BUFF_HEIGHT = 40;


const __ = {
    speed: Symbol('speed'),
    motion:true  // true 向下运动
}

let databus = new DataBus();

//生成buff位置
function rnd (start , end) {
    return Math.floor(Math.random() * (end-start) +start)
}

export default class ShootBigger extends Sprite {
    constructor() {
        super(BUFF_IMG_SRC, BUFF_WIDTH, BUFF_HEIGHT)
    
    }

    init(speed, enemy={}){
        this.x = rnd(0, window.innerWidth - BUFF_WIDTH);
        this.y = -this.height;
        this[__.speed] = speed;
        this.visible = true;
    }

    // buff 做往返运动
    update () {
        if(this[__.motion]){
            if (this.y > window.innerHeight-this.height) {
                this[__.motion] = false;
            } else {
                this.y += this[__.speed];
            }
        } else {
            if (this.y<0) {
                this[__.motion] = true;
            } else {
                this.y -= this[__.speed];
            }
            
        }

        
    }

}
