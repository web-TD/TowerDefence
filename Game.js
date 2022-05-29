/*import Map from './Map.js'
import Tower from './Tower.js'*/

const TowerRadius = 10;

class Game {
    constructor(map) {
        this.Money = 0;
        this.Towers = [];
        this.Projectile = []
        this.Enemies = [];
        this.Bullets = [];
        this.GlobalUpgrades = [];
        this.WaveCount = 0;
        this.WaveTick = 0;
        this.NextWaveTick = 60 * 120; // из предположения что в секунду произойдет 60 тиков
        this.PlayerHealth = 20;
        this.map = map;
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
    }

    UpgradeTower(TowerId, UpgradeId) {
    }

    CanGlobalUpgrade(UpgradeId) {
    }

    GlobalUpgrade(UpgradeId) {
    }

    GameTick() {
        if(this.WaveTick >= this.NextWaveTick)
            this.StartWave();
                                                    // TODO call towers tick, enemy tick, projectile tick
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