import Buff       from './buff/shootBigger'
import DataBus    from './databus'
import Player1    from './player1/index'
import Player2    from './player2/index'
// import Stone      from './stone/index'

let ctx = canvas.getContext('2d');
let databus = new DataBus();



export default class Main{
    constructor() {
        this.restart();
    }
    restart() {
        databus.reset();
    
        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        )
    
        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas,
        )
        this.player1 = new Player1();
        this.player2 = new Player2();
        // this.stone   = new Stone();   
    }

    //游戏结束后的触摸事件
    touchEventHandler(e) {
        e.preventDefault();
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY

        let area = this.gameinfo.btnArean

        if (   x >= area.startX
            && x <= arrea.endX
            && y >= area.startY
            && y <= area.endY
        ){
            this.restart();
        }
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render () {
        ctx.clearRect(0,0,canvas.width,canvas.height)


        this.player1.drawToCanvas(ctx)
        this.player2.drawToCanvas(ctx)
        // this.stone.drawToCanvas(ctx)      
    }

    //游戏逻辑数据更新
    update() {
        this.player1.update();
        this.player2.update();

        //碰撞检测
    }

    loop() {
        this.update();
        this.render();

        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas
        )

    }

}

