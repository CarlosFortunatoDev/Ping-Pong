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
}

setup()
draw()