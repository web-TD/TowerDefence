import {Laser, Turret, MegaImba} from "../Game/Tower.js";
import {getButton, getElement, clearDiv, stackElements, deleteDivByID} from "../utils.js";
import PauseMenu from "./PauseMenu.js";

export default class SideMenu {
    constructor(game) {
        this.sideMenu = getElement(document.body, 'div', 'side-menu');
        this.page = 0;
        this.pauseMenu = new PauseMenu(game);
        this.stackCount = 5;
        this.game = game;
    }

    showSideMenu() {
        clearDiv(this.sideMenu);
        this.createShop();
        this.createControlButtons();
    }

    createShop() {
        let towers = [Laser, Turret, MegaImba].sort((a, b) => {return a.cost - b.cost});
        this.createShopPage(towers);
        let pageButtons = getElement(this.sideMenu, 'div', 'pages');
        let prevPageBtn = getButton(
            pageButtons,
            this.previousPage.bind(this),
            'page-buttons',
            'prev-page-button');
        let nextPageBtn = getButton(
            pageButtons,
            this.nextPage.bind(this),
            'page-buttons',
            'next-page-button');
        prevPageBtn.setAttribute('oncontextmenu', 'return false;');
        nextPageBtn.setAttribute('oncontextmenu', 'return false;');
        nextPageBtn.maxPages = Math.ceil(towers.length / 4);
        let nextRects = getElement(pageButtons, 'div', 'page-rects', 'next-rects');
        let prevRects = getElement(pageButtons, 'div', 'page-rects', 'prev-rects');
        let leftArrowContainer = getElement(pageButtons, 'div', 'arrow', 'left-arrow');
        let rightArrowContainer = getElement(pageButtons, 'div', 'arrow', 'right-arrow');
        stackElements(prevRects, this.stackCount, 'div', 'page-rect');
        stackElements(nextRects, this.stackCount, 'div', 'page-rect');
        let leftArrow = getElement(leftArrowContainer, 'h1');
        let rightArrow = getElement(rightArrowContainer, 'h1');
        leftArrow.textContent = '\u2190';
        rightArrow.textContent = '\u2192';
    }

    createShopPage(towers) {
        let pageItems = towers.slice(4 * this.page, Math.min(4 * (this.page + 1), towers.length));
        let shop = getElement(this.sideMenu, 'div', 'shop');
        let shopRects = getElement(shop, 'div', 'shop-rects');
        for (let i = 0; i < pageItems.length; i++) {
            let item = pageItems[i];
            let buyBtn = getButton(shop, this.buy.bind(this), 'buy-buttons', `buy-button${i}`);
            buyBtn.towerType = item;
            buyBtn.setAttribute('oncontextmenu', 'return false;');
            let buyBtnRects = getElement(shopRects, 'div', `buy-rects`, `buy-rects${i}`);
            let towerInfoRects = getElement(buyBtnRects, 'div', `tower-info-rects`);
            let towerCostRects = getElement(buyBtnRects, 'div', 'tower-cost-rects');
            let towerInfos = getElement(buyBtnRects, 'div', 'tower-infos');
            let towerCosts = getElement(buyBtnRects, 'div', 'tower-costs');
            stackElements(buyBtnRects, this.stackCount, 'div', 'buy-rect');
            stackElements(towerInfoRects, this.stackCount, 'div', 'tower-info-rect');
            stackElements(towerCostRects, this.stackCount, 'div', 'tower-cost-rect');
            stackElements(towerInfos, this.stackCount, 'div', 'tower-info', item.name, true);
            stackElements(towerCosts, this.stackCount, 'div', 'tower-cost', item.cost, true);
        }
    }

    createControlButtons() {
        let controlButtons = getElement(this.sideMenu, 'div', 'controls');
        let pauseBtn = getButton(controlButtons, this.pause.bind(this), 'control-buttons', 'pause-button');
        pauseBtn.setAttribute('oncontextmenu', 'return false;');
        let restartBtn = getButton(controlButtons, this.restart.bind(this), 'control-buttons', 'restart-button');
        restartBtn.setAttribute('oncontextmenu', 'return false;');
        let pauseRects = getElement(controlButtons, 'div', 'control-rects', 'pause-rects');
        let restartRects = getElement(controlButtons, 'div', 'control-rects', 'restart-rects');
        let pauseText = getElement(controlButtons, 'div', 'control-texts', 'pause-texts');
        let restartText = getElement(controlButtons, 'div', 'control-texts', 'restart-texts');
        stackElements(pauseRects, this.stackCount, 'div', 'control-rect');
        stackElements(restartRects, this.stackCount, 'div', 'control-rect');
        let pauseTexts = stackElements(pauseText, this.stackCount, 'div', 'control-text', 'Pause', true);
        let restartTexts = stackElements(restartText, this.stackCount, 'div', 'control-text', 'Restart', true);
        for (let i = 0; i < this.stackCount; i++) {
            pauseTexts[i].setAttribute('id', `pause-text${i}`);
            restartTexts[i].setAttribute('id', `restart-text${i}`);
        }
    }

    buy (event) {
        let towertype = event.currentTarget.towerType;
        let isPlacing = false;
        let followCursor = (function() {
            let s = document.createElement('div');
            s.setAttribute('id', 'following-tower');
            s.setAttribute('oncontextmenu', 'return false;');
            s.style.background = `url("../assets/towers/${event.currentTarget.towerType.name}.png")`;
            return {
                init: function(event) {
                    if(document.getElementById('following-tower') !== null)
                        deleteDivByID('following-tower');
                    let e = event;
                    s.style.left = (e.clientX - 50) + 'px';
                    s.style.top = (e.clientY - 100) + 'px';
                    isPlacing = true;
                    document.body.appendChild(s);
                },

                run: function(e) {
                    s.style.left = (e.clientX - 50) + 'px';
                    s.style.top = (e.clientY - 100) + 'px';
                },

                stop: function (){
                    isPlacing = false;
                    if(document.getElementById('following-tower') !== null)
                        deleteDivByID('following-tower');
                }
            };
        }());

        followCursor.init(event);
        document.body.onmousemove = followCursor.run;
        document.body.oncontextmenu = followCursor.stop;
        //tower image following added. todo add following with range and place tower
        document.body.onmousedown = (event) => {
            if (isPlacing){
                followCursor.stop();
                this.game.PlaceTower({X: event.clientX - 50, Y: event.clientY - 100}, towertype);
            }
        };
    }

    nextPage(event) {
        if (this.page >= event.currentTarget.maxPages - 1)
            return;
        this.page++;
        this.showSideMenu();
    }

    previousPage() {
        if (this.page <= 0)
            return;
        this.page--;
        this.showSideMenu();
    }

    restart() {
        this.game.SetDefault();
    }

    pause() {
        this.pauseMenu.pause();
    }
}