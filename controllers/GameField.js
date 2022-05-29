import {getElement, getTextSize} from "../utils.js";

export default class GameField {
    constructor(width, height, game) {
        this.w = width;
        this.h = height;
        this.canvas = getElement(document.body, 'canvas', 'game-canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.game = game;
    }

    drawGameField() {
        this.context.clearRect(0, 0, this.w, this.h);
        this.drawMapElements(this.game.Towers);
        this.drawMapElements(this.game.Enemies);
        this.drawMapElements(this.game.Bullets);
        this.drawData();
    }

    drawMapElements(elements) {
        for (let el in elements) {
            this.drawMapElement(el, el.angle * Math.PI / 180);
        }
    }

    drawMapElement(el, angle) {
        let xScaling = this.w / this.game.map.width;
        let yScaling = this.h / this.game.map.height;
        let topLeftCorner = {x: el.x - el.img.clientWidth, y: el.y - el.img.clientHeight};
        this.context.save();
        this.context.translate(this.w / 2, this.h / 2);
        this.context.rotate(angle);
        this.context.drawImage(el.img, topLeftCorner.x * xScaling, topLeftCorner.y * yScaling);
        this.context.restore();
    }

    drawData(){
        this.context.font = `32px Arial`;
        this.fillHealth(this.game.PlayerHealth);
        this.fillWaves(this.game.WaveCount);
        this.fillMoney(this.game.Money);
        this.fillTime(10);
    }

    fillHealth(health) {
        let healthInfo = `Health: ${health}`;
        let size = getTextSize(this.context, healthInfo);
        this.context.fillText(healthInfo, 10, size.h + 10);
    }

    fillWaves(waves) {
        let wavesInfo = `Waves: ${waves}`;
        let size = getTextSize(this.context, wavesInfo)
        this.context.fillText(wavesInfo, this.canvas.width - size.w - 10, size.h + 10);
    }

    fillMoney(amount) {
        let moneyInfo = `Money: ${amount}`;
        this.context.fillText(moneyInfo, 10, this.canvas.height - 10);
    }

    fillTime(time) { /* TODO(Cockamamie): Add timer */
        let timeInfo = `Time: ${time}`;
        let size = getTextSize(this.context, timeInfo);
        this.context.fillText(timeInfo, this.canvas.width - size.w - 10, this.canvas.height - 10);
    }
}