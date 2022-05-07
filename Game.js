import Map from './MapScipt'
import Tower from './TowerScript'

class Game{
    constructor(map) {
        this.Money = 0;
        this.Towers = [];
        this.Enemys = [];
        this.GlobalUpgrades = [];
        this.TowersStore = [];
        this.WaveCount = 0;
        this.WaveTick = 0;
        this.NextWaveTick = 60 * 120; // из предположения что в секунду произойдет 60 тиков
        this.map = map;
    }

    IsCanBayTower(TowerType){}
    IsCanPlaceTower(point, TowerType){}
    PlaceTower(point, TowerType){}
    IsCanUpgradeTower(TowerId, UpgradeId){}
    UpgradeTower(TowerId, UpgradeId){}

    IsCanGlobalUpgrade(UpgradeId){}
    GlobalUpgrade(UpgradeId){}

    GameTick(){}
    StartWave(){}
}