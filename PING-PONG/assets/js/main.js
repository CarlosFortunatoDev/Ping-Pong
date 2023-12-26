const canvasEl = document.querySelector("canvas")
const canvasCtx = canvasEl.getContext("2d")
const lineWidth = 15;

const field ={
    w: window.innerWidth,
    h: window.innerHeight,
    draw (){
    //Desenho do Campo
    canvasCtx.fillStyle = "#286047"
    canvasCtx.fillRect(0,0, window.innerWidth, window.innerHeight)
    }
}

const setup = () => {
    canvasEl.width = canvasCtx.width = field.w
    canvasEl.height = canvasCtx.height = field.h
}

const draw = () =>{
    field.draw()

    //Desenho linha central
    canvasCtx.fillStyle = "#ffffff"
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2,0,lineWidth, window.innerHeight)

    //Desenho raquete esquerda
    canvasCtx.fillRect(10, 400, lineWidth, 200)

    //Desenho raquete direita
    canvasCtx.fillRect(window.innerWidth - lineWidth - 10, 400,lineWidth, 200)

    //Desenho Bola
    canvasCtx.beginPath()
    canvasCtx.arc(500,500,20,0, 2 * Math.PI, false)
    canvasCtx.fill()

    //Desenho placar
    canvasCtx.font = "bold 72px Arial"
    canvasCtx.textAlign = "center"
    canvasCtx.textBaseline = "top"
    canvasCtx.fillStyle = "#01341D"
    canvasCtx.fillText("3", window.innerWidth / 4, 50)
    canvasCtx.fillText("1", 3 * window.innerWidth / 4 , 50)
}

setup()
draw()