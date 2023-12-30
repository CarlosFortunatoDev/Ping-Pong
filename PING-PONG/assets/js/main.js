const canvasEl = document.querySelector("canvas")
const canvasCtx = canvasEl.getContext("2d")
const lineWidth = 15
const gapX = 10
const mouse = { x:0, y:0}

const field = {
    w: window.innerWidth,
    h: window.innerHeight,

    draw() {    //Desenho do Campo
        canvasCtx.fillStyle = "#286047"
        canvasCtx.fillRect(0, 0, this.w, this.w)
    }
}

const line = {
    w: 15,
    h: field.h,
    draw() {    //Desenho linha central
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h)
    }
}

const leftPaddle = {
    x: gapX,
    y: 400,
    w: line.w,
    h: 200,
    _move(){
        this.y = mouse.y - this.h / 2
    },
    draw() { //Desenho raquete esquerda
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._move();
    }
}

const rightPaddle = {
    x: field.w - line.w - gapX,
    y: 400,
    w: line.w,
    h: 200,
    _move(){
        this.y = ball.y - this.h /2
    },
    draw() { //Desenho raquete direita
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._move()
    }
}

const score = {
    human: 3,
    computer: 1,
    draw() { //Desenho placar
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        canvasCtx.fillText(this.human, field.w / 4, 50)
        canvasCtx.fillText(this.computer, 3 * field.w / 4, 50)
    }
}

const ball = {
    x: 0,
    y: 0,
    r: 20,
    speed: 5,
    directionX: 1,
    directionY: 1,
    _calcPosition(){
        // Verifica a lateral superior e inferior do campo
        if (
            (this.y - this.r < 0 && this.directionY < 0) ||
            (this.y > field.h - this.r && this.directionY > 0)
            ) {
                //rebate a bola invertendo o sinal do eixo y
                this._reverseY()
        }
    },
    _reverseY(){
        this.directionY *= -1
    },
    _reverseX(){
        this.directionX *= -1
    },
    _move() {
        this.x += this.directionX * this.speed,
        this.y += this.directionY * this.speed
    },
    draw() {    //Desenho Bola
        canvasCtx.fillStyle = "#ffffff"
        
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()

        this._calcPosition()
        this._move();
    }
}

const setup = () => {
    canvasEl.width = canvasCtx.width = field.w
    canvasEl.height = canvasCtx.height = field.h
}


const draw = () => {
    field.draw()
    line.draw()
    leftPaddle.draw()
    rightPaddle.draw()
    score.draw()
    ball.draw()
}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

const main = () => {
    animateFrame(main)
    draw()
}

setup()
main()

canvasEl.addEventListener("mousemove", function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY
})