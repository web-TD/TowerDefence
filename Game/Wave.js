import Enemy from "./Enemy.js";

const defaultEnemies = [
    {enemy : Enemy, spawnTick : 20},
    {enemy : Enemy, spawnTick : 120},
    {enemy : Enemy, spawnTick : 220},
    {enemy : Enemy, spawnTick : 320},
    {enemy : Enemy, spawnTick : 420},
    {enemy : Enemy, spawnTick : 520},
    {enemy : Enemy, spawnTick : 620},
    {enemy : Enemy, spawnTick : 720},
    {enemy : Enemy, spawnTick : 820},
    {enemy : Enemy, spawnTick : 920},
    {enemy : Enemy, spawnTick : 1020},
    {enemy : Enemy, spawnTick : 1120},
    {enemy : Enemy, spawnTick : 1220},
    {enemy : Enemy, spawnTick : 1320},
    {enemy : Enemy, spawnTick : 1420},
    {enemy : Enemy, spawnTick : 1520},
]

class Wave {
    constructor(name, enemyAndSpawn) {
        this.name = name;
        this.enemies = enemyAndSpawn;
        this.multipleHp = 1;
    }
}

export class DefaultWave extends Wave{
    constructor(name, multipleHp) {
        super(name, defaultEnemies);
        this.multipleHp = multipleHp;
    }
}