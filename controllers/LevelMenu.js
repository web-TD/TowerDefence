import GameField from "./GameField.js";
import SideMenu from "./SideMenu.js";
import {getElement, getButton, stackElements, addText} from "../utils.js";
import Game from "../Game/Game.js";

export default class LevelMenu {
    constructor() {
        this.levelMenu = getElement(document.body, 'div', 'level-menu');
        this.stackCount = 5;
    }

    create() {
        this.createHeader();
        this.createLvlButtons();
    }

    createHeader() {
        let headerContainer = getElement(this.levelMenu, 'div', 'header-container');
        stackElements(headerContainer, 6, 'div', 'header', 'Tower defense', true);
    }

    createLvlButtons() {
        let lvlButtonsRects = getElement(this.levelMenu, 'div', 'level-buttons-rects')
        let lvlButtons = getElement(this.levelMenu, 'div', 'level-buttons');
        for (let i = 1; i <= 3; i++) {
            let lvlButton = getButton(lvlButtons, this.startLevel.bind(this), `level-button`);
            lvlButton.lvl = i;
            let lvlButtonRects = getElement(lvlButtonsRects, 'div', 'level-button-rects');
            let lvlInfoRects = getElement(lvlButtonRects, 'div', 'level-info-rects');
            let lvlPreview = getElement(lvlButtonRects, 'div', `level-preview`);
            let image = getElement(lvlPreview,'img', 'level-preview-image');
            if(i !== 3)
                image.src=`assets/level_maps/${i}.png`;
            let lvlInfo = getElement(lvlButtonRects, 'div', 'level-info')
            addText(lvlInfo, `Level ${i}`);
            stackElements(lvlButtonRects, this.stackCount, 'div', 'level-button-rect');
            stackElements(lvlInfoRects, this.stackCount, 'div', 'level-info-rect');
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
        }, 17);

        setInterval(function () {
            game.GameTick();
        }, 17);
    }
}