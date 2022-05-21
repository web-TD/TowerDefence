/*import Map from './Map.js'
import Tower from './Tower.js'*/

const TowerRadius = 10;

class Game {
    constructor(map) {
        this.Money = 0;
        this.Towers = [];
        this.Enemys = [];
        this.Projectile = []
        this.Enemies = [];
        this.GlobalUpgrades = [];
        this.TowersStore = [];
        this.WaveCount = 0;
        this.WaveTick = 0;
        this.NextWaveTick = 60 * 120; // из предположения что в секунду произойдет 60 тиков
        this.PlayerHealth = 20;
        this.map = map;
    }

    CanBuyTower(TowerType) {
        return this.Money >= this.TowersStore[TowerType].Cost;
    }

    CanPlaceTower(point, TowerType) {
        return this.map.getDistanceToPath(point) >= this.map.pathRadius + TowerRadius;
    }

    PlaceTower(point, TowerType) {
        if(this.CanPlaceTower(point, TowerType) && this.CanBuyTower(TowerType)){
            this.Towers.push(this.TowersStore[TowerType](point));
            this.Money -= this.TowersStore[TowerType].Cost;
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
                                                    //TODO
        this.WaveTick++;
    }

    StartWave() {
        this.WaveTick = 0;
                                                    // TODO
    }
}