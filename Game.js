/*import Map from './Map.js'
import Tower from './Tower.js'*/

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
    }

    CanPlaceTower(point, TowerType) {
    }

    PlaceTower(point, TowerType) {
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
    }

    StartWave() {
    }
}