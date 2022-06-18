import GameField from "./GameField.js";
import SideMenu from "./SideMenu.js";
import {getElement} from "../utils.js";
import Game from "../Game/Game.js";

export default class LevelMenu {
    constructor() {
        this.levelMenu = getElement(document.body, 'div', 'level-menu');
    }

    foo() {
        for (let i = 1; i <= 3; i++) {
            let btn = document.createElement('button');
            btn.style.width = '500px';
            btn.style.height = '100px';
            btn.lvl = i;
            btn.addEventListener('click', this.startLevel.bind(this))
            this.levelMenu.appendChild(btn);
        }
    }

    startLevel(event) {
        let lvl = event.currentTarget.lvl;
        this.levelMenu.style.visibility = 'hidden';
        let game = new Game(lvl);
        let gameField = new GameField(innerWidth * 0.7, innerHeight, game);
        let sideMenu = new SideMenu(game);
        sideMenu.showSideMenu();
        gameField.drawGameField();
        setInterval(function () {
            gameField.drawGameField();
        }, 10)
    }
}