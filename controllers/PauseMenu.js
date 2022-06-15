import {addText} from "../utils.js";

export default class PauseMenu {
    constructor(game) {
        this.game = game;
        this.createPauseStartPage();
    }

    pause() {
        if (this.game.isPaused)
            return;
        this.pauseMenu.style.visibility = 'visible';
        this.showPauseMenu();
        this.game.togglePause();
    }

    resume() {
        if (!this.game.isPaused)
            return;
        this.pauseMenu.style.visibility = 'hidden';
        this.hidePauseMenu();
        this.game.togglePause();
    }

    showPauseMenu() {
        this.resumeButton.style.visibility = 'visible';
        this.exitButton.style.visibility = 'visible';
    }

    hidePauseMenu() {
        this.resumeButton.style.visibility = 'hidden';
        this.exitButton.style.visibility = 'hidden';
    }

    createPauseStartPage() {
        this.pauseMenu = document.createElement('div');
        this.pauseMenu.setAttribute('id', 'pauseMenu');
        this.pauseMenu.style.visibility = 'hidden';
        document.body.appendChild(this.pauseMenu);
        this.resumeButton = this.getButton('resume', 'Resume', this.resume.bind(this));
        this.exitButton = this.getButton('exit', 'Exit', this.exit.bind(this));
    }

    exit() {

    }

    getButton(id, text, onClick) {
        let btn = document.createElement('div');
        btn.setAttribute('id', id);
        addText(btn, text);
        btn.addEventListener('click', onClick);
        btn.style.visibility = 'hidden';
        this.pauseMenu.appendChild(btn);
        return btn;
    }
}