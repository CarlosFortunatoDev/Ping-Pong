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
    speed:10,
    _move(){
        if (this.y + this.h /2 < ball.y + ball.r) {
            this.y += this.speed
        } else{
            this.y -= this.speed
        }
    },
    speedUp(){
        this.speed ++
    },
    draw() { //Desenho raquete direita
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
        this._move()
    }
}

const score = {
    human: 0,
    computer: 0,
    increaseHuman(){
        this.human ++
    },
    increaseComputer(){
        this.computer ++
    },
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
    x: field.w/2,
    y: field.h/2,
    r: 20,
    speed: 10,
    directionX: 1,
    directionY: 1,
    _calcPosition(){
        // Verifica se o jogador 1 fez um ponto (x > largura do campo)
        if (this.x > field.w - this.r - rightPaddle.w - gapX) {
            // Verifica se a raquete direita está na posição y da bola
            if (this.y + this.r > rightPaddle.y && this.y - this.r < rightPaddle.y + rightPaddle.h) {
                // Rebate a bola invertendo o sinal de x
                this._reverseX()
            } else{
                // Pontuar para o jogador 1
                score.increaseHuman()
                this._pointUp()
            }
        }

        // Verifica se o jogador 1 fez um ponto (x > largura do campo)
        if (this.x < this.r + leftPaddle.w + gapX) {
            // Verifica se a raquete esquerda está na posição y da bola
            if (this.y + this.r > leftPaddle.y && this.y - this.r < leftPaddle.y + leftPaddle.h) {
                // Rebate a bola invertendo o sinal de x
                this._reverseX()
            } else{
                // Pontuar para o jogador 2
                score.increaseComputer()
                this._pointUp()
            }
        }

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

    _speedUp(){
        this.speed +=2
    },
    _pointUp(){
        this._speedUp()
        rightPaddle.speedUp()

        this.x = field.w / 2
        this.y = field.h / 2
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
