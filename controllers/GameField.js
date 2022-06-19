import {getElement, addText} from "../utils.js";

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
        this.initGameField();
    }

    drawGameField() {
        this.context.clearRect(0, 0, this.w, this.h);
        this.drawMap();
        this.drawMapElements(this.game.Towers);
        this.drawMapElements(this.game.Enemies);
        this.drawMapElements(this.game.Bullets);
        this.updateData();
    }

    drawMapElements(elements) {
        for (let el in elements) {
            this.drawMapElement(el, el.angle * Math.PI / 180);
        }
    }

    drawMapElement(el, angle) {
        let xScaling = this.w / this.game.map.width;
        let yScaling = this.h / this.game.map.height;
        let topLeftCorner = {x: el.position.X - el.img.clientWidth, y: el.position.Y - el.img.clientHeight};
        this.context.save();
        this.context.translate(this.w / 2, this.h / 2);
        this.context.rotate(angle);
        this.context.drawImage(el.img, topLeftCorner.x * xScaling, topLeftCorner.y * yScaling);
        this.context.restore();
    }

    drawMap() {
        this.drawImage(this.game.map.img);
    }

    drawImage(imgSource) {
        let img = new Image();
        let context = this.context;
        img.src = imgSource;
        context.drawImage(img, 0, 0, this.w, this.h);
    }

    updateData(){
        this.fillHealth(this.game.PlayerHealth);
        this.fillWaves(this.game.WaveCount);
        this.fillMoney(this.game.Money);
        this.fillTime(10);
    }

    fillHealth(health) {
        this.health.firstChild.textContent = `Health: ${health}`;
    }

    fillWaves(waves) {
        this.waves.firstChild.textContent = `Waves: ${waves}`;
    }

    fillMoney(amount) {
        this.money.firstChild.textContent = `Money: ${amount}`;
    }

    fillTime(time) { /* TODO(Cockamamie): Add timer */
        this.time.firstChild.textContent = `Time: ${time}`;
    }

    initGameField() {
        this.gameField = getElement(document.body, 'div', 'game-field');
        let gameData = getElement(this.gameField, 'div', 'data');
        this.health = getElement(gameData, 'div', `health`);
        this.waves = getElement(gameData, 'div', `waves`);
        this.money = getElement(gameData, 'div', `money`);
        this.time = getElement(gameData, 'div', `time`);
        addText(this.health);
        addText(this.waves);
        addText(this.money);
        addText(this.time);

    }
}