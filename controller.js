const dataTextSize = 32;

let canvas = getCanvas("canvas");
setCanvasSize();
addEventListener("resize", setCanvasSize);
let context = canvas.getContext("2d");

let menuCanvas = getCanvas("menuCanvas");
setMenuCanvasSize();
setMenuCanvasPos();
addEventListener("resize", setMenuCanvasSize);
addEventListener("resize", setMenuCanvasPos);
let menuContext = menuCanvas.getContext("2d");

function getCanvas(id) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", id)
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.zIndex = "1";
    document.body.appendChild(canvas);
    return canvas;
}

function setCanvasSize() {
    canvas.width = innerWidth * 0.7;
    canvas.height = innerHeight

}

function setMenuCanvasSize() {
    menuCanvas.width = innerWidth * 0.3;
    menuCanvas.height = innerHeight;
}

function setMenuCanvasPos() {
    menuCanvas.style.left = `${innerWidth * 0.7}px`;
}

setInterval(draw, 10)

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    menuContext.clearRect(canvas.width, 0, menuCanvas.width, menuCanvas.height);
    drawMap()
    drawData()
}

function drawMap() {

}


function drawData(){
    context.font = `${dataTextSize}px Arial`;
    context.fillStyle = "black";
    drawHealth()
    drawWaves()
    drawMoney()
    drawTime()
}

function drawHealth(health=10) {
    let healthInfo = `Health: ${health}`
    let size = getTextSize(healthInfo);
    context.fillText(healthInfo, 10, size.h + 10); /*TODO(Cockamamie): maxWidth*/
}

function drawWaves(waves=15) {
    let wavesInfo = `Waves: ${waves}`
    let size = getTextSize(wavesInfo)
    context.fillText(wavesInfo, canvas.width - size.w - 10, size.h + 10); /*TODO(Cockamamie): maxWidth*/
}

function drawMoney(money=50) {
    let moneyInfo = `Money: ${money}`;
    context.fillText(moneyInfo, 10, canvas.height - 10); /*TODO(Cockamamie): maxWidth*/
}

function drawTime(time=10) {
    let timeInfo = `Time: ${time}`;
    let size = getTextSize(timeInfo);
    context.fillText(timeInfo, canvas.width - size.w - 10, canvas.height - 10); /*TODO(Cockamamie): maxWidth*/
}

function getTextSize(text) {
    let metrics = context.measureText(text);
    let height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return {w: metrics.width, h: height};
}