import Map from './Map.js'
import {DATA} from "../utils.js";
import Enemy from "./Enemy.js";

export default class Game {
    constructor(lvl) {
        this.Money = 0;
        this.Towers = [];
        this.Bullets = [];
        this.Enemies = [];
        this.GlobalUpgrades = [];
        this.WaveCount = 0;
        this.WaveTick = 0;
        this.NextWaveTick = 60 * 120; // из предположения что в секунду произойдет 60 тиков
        this.PlayerHealth = 20;
        this.lvl = lvl;
        this.map = new Map(lvl);
        this.isPaused = false;
    }

    CanBuyTower(TowerType) {
        return this.Money >= TowerType.Cost;
    }

    CanPlaceTower(point, TowerType) {
        let fl1 =  this.map.getDistanceToPath(point) >= this.map.pathRadius + TowerRadius;
        let fl2 = true;
        for(let tower in this.Towers){
            if(getDistance(point, tower.position) < TowerType.Radius + tower.Radius){
                fl2 = false;
                break;
            }
        }
        return fl1 && fl2;
    }

    PlaceTower(point, TowerType) {
        if(this.CanPlaceTower(point, TowerType) && this.CanBuyTower(TowerType)){
            this.Towers.push(TowerType.constructor(point));
            this.Money -= TowerType.Cost;
            return true;
        }
        return false;
    }

    CanUpgradeTower(TowerId, UpgradeId) {
        return this.Money >= this.Towers[TowerId].upgrades[UpgradeId].Cost();
    }

    UpgradeTower(TowerId, UpgradeId) {
        if(this.CanUpgradeTower(TowerId, UpgradeId)){
            this.Money -= this.Towers[TowerId].upgrades[UpgradeId].Cost();
            this.Towers[TowerId].upgrades[UpgradeId].LvlUp();
            return true;
        }
        return false;
    }

    CanGlobalUpgrade(UpgradeId) {
    }

    GlobalUpgrade(UpgradeId) {
    }

    GameTick() {
        if(this.WaveTick >= this.NextWaveTick)
            this.StartWave();
        for(let tower in this.Towers)
            tower.Tick();
        for(let bullet in this.Bullets)
            bullet.Move();
        for(let enemy in this.Enemies)
            enemy.Move();
        this.WaveTick++;
    }

    StartWave() {
        this.WaveTick = 0;
        this.WaveCount++;
                                                    // TODO add Enemy
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }
}

function getDistance(p1, p2){
    return (p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y);
}