import Map from './Map.js'
import Enemy from "./Enemy.js";
import {DefaultWave} from "./Wave.js";

const TowerRadius = 10;

const StandardWaves = [
    new DefaultWave("1", 1),
    new DefaultWave("2", 1),
    new DefaultWave("3", 1.1),
    new DefaultWave("4", 1.2),
    new DefaultWave("5", 1.5),
    new DefaultWave("6", 2),
    new DefaultWave("7", 2),
    new DefaultWave("8", 2),
    new DefaultWave("9", 2),
    new DefaultWave("10 Boss", 4),
    new DefaultWave("11", 4),
    new DefaultWave("12", 5),
    new DefaultWave("13", 5),
    new DefaultWave("14", 6),
    new DefaultWave("15 Boss", 12),
]

export default class Game {
    constructor(lvl) {
        this.SetDefault();
        this.lvl = lvl;
        this.map = new Map(lvl);
    }

    SetDefault(){
        this.Money = 20;
        this.Towers = [];
        this.Bullets = {};
        this.Enemies = {};
        this.Waves = StandardWaves;
        this.WaveCount = 0;
        this.WaveTick = 0;
        this.NextWaveTick = 60 * 120; // из предположения что в секунду произойдет 60 тиков
        this.PlayerHealth = 20;
        this.isPaused = false;
        this.__usedEnemyId = 0;
        this.__waveEnemyId = 0;
        this.__bulletId = 0;
    }

    CanBuyTower(TowerType) {
        return this.Money >= TowerType.Cost;
    }

    CanPlaceTower(point, TowerType) {
        let fl1 =  this.map.getDistanceToPath(point) >= this.map.pathRadius + TowerRadius;
        let fl2 = true;
        for(let tower in this.Towers){
            if(getDistance(point, tower.position) < TowerType.radius + tower.radius){
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
        if(this.isPaused)
            return;
        if(this.WaveTick >= this.NextWaveTick)
            this.StartWave();
        this.MoveEnemies();

        let bulletToClear = []
        for(let bulletId in this.Bullets)
            if(this.Bullets[bulletId].Move()){
                bulletToClear.push(bulletId);
            }else{
                for(let enemyId in this.Enemies){
                    if(getDistance(this.Bullets[bulletId].position, this.Enemies[enemyId].position)
                        < this.Enemies[enemyId].radius){
                        bulletToClear.push(bulletId);
                        this.Enemies[enemyId].TakeDamage(this.Bullets[bulletId].damage);
                    }
                }
            }
        for(let id in bulletToClear)
            delete this.Bullets[id];

        this.ClearEnemies();
        this.SpawnEnemy();
        let enemies = [];
        for(let id in this.Enemies)
            enemies.push(this.Enemies[id]);
        for(let tower in this.Towers) {
            let bullet = tower.Tick(enemies);
            if (bullet !== null) {
                this.Bullets[this.__bulletId] = bullet;
                this.__bulletId++;
            }
        }
        this.WaveTick++;
    }

    ClearEnemies(){
        let enemiesToClear = [];
        for(let enemyId in this.Enemies)
            if(!this.Enemies[enemyId].isLive) {
                if(this.Enemies[enemyId].health <= 0)
                    this.Money += this.Enemies[enemyId].reward;
                enemiesToClear.push(enemyId);
            }
        for(let id in enemiesToClear)
            delete this.Enemies[enemiesToClear[id]];
    }

    MoveEnemies(){
        for(let enemyId in this.Enemies)
            if (this.Enemies[enemyId].Move()) {
                if (this.map.enemyPath.length - 1 === this.Enemies[enemyId].targetId) {
                    this.PlayerHealth--;
                    this.Enemies[enemyId].Die();
                } else {
                    this.Enemies[enemyId].SetTarget(this.map.enemyPath[this.Enemies[enemyId].targetId + 1]);
                }
            }
    }

    SpawnEnemy(){
        if(this.Waves[this.WaveCount].enemies.length > this.__waveEnemyId &&
            this.Waves[this.WaveCount].enemies[this.__waveEnemyId].spawnTick === this.WaveTick){
            this.Enemies[this.__usedEnemyId] = new this.Waves[this.WaveCount]
                .enemies[this.__waveEnemyId].enemy(this.map.enemyPath[0], this.map.enemyPath[1]);
            this.Enemies[this.__usedEnemyId].health = Math.ceil(this.Waves[this.WaveCount].multipleHp
                * this.Enemies[this.__usedEnemyId].health);
            this.__waveEnemyId++;
            this.__usedEnemyId++;
        }
    }

    CanStartWave(){
        return this.__waveEnemyId === this.Waves[this.WaveCount].enemies.length;
    }

    StartWave() {
        if(this.CanStartWave()) {
            this.WaveTick = 0;
            this.WaveCount++;
            this.__waveEnemyId = 0;
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }
}

function getDistance(p1, p2){
    return (p1.X - p2.X) * (p1.X - p2.X) + (p1.Y - p2.Y) * (p1.Y - p2.Y);
}