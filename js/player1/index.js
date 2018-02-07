import Sprite from '../base/sprite'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const PLAYER_IMG_SRC = 'images/test.png'
const PLAYER_WIDTH   = 100
const PLAYER_HEIGHT  = 20



export default class Player extends Sprite{
    constructor() {
        super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

        this.x = -10
        this.y = 0
        console.log(this.motion)
        this.initEvent()
        this.motion = true;
        this.touched = false;
        this.meet = false;
    }

    //
    initEvent(){
        canvas.addEventListener('touchstart',(e => {
            console.log(e)
            if (e.touches[0].clientX < screenWidth/2) {
                this.touched = true
            }
           
        }).bind(this))
    }

    update () {
        
        if (!this.touched){
            if(this.motion){
                if(this.y > window.innerHeight-this.height) {
                    this.motion = false;
                } else {
                    this.y += 10;
                }
            } else {
                if (this.y <0) {
                    this.motion = true;
                } else {
                    this.y -= 10;
                }
            }
        } else {
            if (this.meet) {
                this.x -= 9
                if(this.x<-10){
                    this.x = -10;
                    this.touched = false;
                    this.meet = false;
                }
            }else {
                this.x += 9
                if(this.x>200){
                    this.meet =true;
                }
            }
        }
        
    }


}