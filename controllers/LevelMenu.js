import GameField from "./GameField.js";
import SideMenu from "./SideMenu.js";
import {getElement} from "../utils.js";

export default class LevelMenu {
    constructor() {
        this.levelMenu = getElement(document.body, 'div', 'level-menu');
    }

    foo() {
        for (let i = 0; i < 5; i++) {
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
        let map = new Map(640, 480, [{X:0, Y:0}, {X:640, Y:0}, {X:640, Y:480}, {X:0, Y:480}]);
        let game = new Game(map);
        let gameField = new GameField(innerWidth * 0.7, innerHeight, game);
        let sideMenu = new SideMenu(game);
        sideMenu.showSideMenu();
        setInterval(function () {
            gameField.drawGameField();
        }, 10)
    }
}