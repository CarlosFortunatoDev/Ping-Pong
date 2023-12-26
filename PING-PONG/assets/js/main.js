const canvasEl = document.querySelector("canvas")
const canvasCtx = canvasEl.getContext("2d")
const lineWidth = 15;

const setup = () => {
    canvasEl.width = canvasCtx.width = window.innerWidth
    canvasEl.height = canvasCtx.height = window.innerHeight
}

const draw = () =>{
    //Desenho do Campo
    canvasCtx.fillStyle = "#286047"
    canvasCtx.fillRect(0,0, window.innerWidth, window.innerHeight)

    //Desenho linha central
    canvasCtx.fillStyle = "#ffffff"
    canvasCtx.fillRect(window.innerWidth / 2 - lineWidth / 2,0,lineWidth, window.innerHeight)
}

setup()
draw()