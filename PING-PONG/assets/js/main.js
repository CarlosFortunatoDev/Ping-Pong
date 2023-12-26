const canvasEl = document.querySelector("canvas")
const canvasCtx = canvasEl.getContext("2d")
const lineWidth = 15
const gapX = 10

const field ={
    w: window.innerWidth,
    h: window.innerHeight,
    
    draw (){    //Desenho do Campo
        canvasCtx.fillStyle = "#286047"
        canvasCtx.fillRect(0,0, this.w, this.w)
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
    draw(){ //Desenho raquete esquerda
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    }
}

const rightPaddle = {
    x: field.w - line.w - gapX,
    y: 400,
    w: line.w,
    h: 200,
    draw(){ //Desenho raquete direita
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.fillRect(this.x, this.y, this.w, this.h)
    }
}

const score = {
    human: 3,
    computer: 1,
    draw(){ //Desenho placar
        canvasCtx.font = "bold 72px Arial"
        canvasCtx.textAlign = "center"
        canvasCtx.textBaseline = "top"
        canvasCtx.fillStyle = "#01341D"
        canvasCtx.fillText(this.human, field.w/ 4, 50)
        canvasCtx.fillText(this.computer, 3 * field.w / 4 , 50)
    }
}

const ball ={
    x: 500,
    y: 500,
    r: 20,
    draw(){    //Desenho Bola
        canvasCtx.fillStyle = "#ffffff"
        canvasCtx.beginPath()
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        canvasCtx.fill()
    }
}

const setup = () => {
    canvasEl.width = canvasCtx.width = field.w
    canvasEl.height = canvasCtx.height = field.h
}


const draw = () =>{
    field.draw()
    line.draw()
    leftPaddle.draw()
    rightPaddle.draw()
    score.draw()
    ball.draw()
}

setup()
draw()