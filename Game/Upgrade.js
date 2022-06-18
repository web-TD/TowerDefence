class Upgrade {
    constructor(name = 'Damage', tower) {
        this.name = name;
        this.lvl = 1;
        this.tower = tower;
    }

    LvlUp(){
        this.lvl++;
        this.addValue();
    }

    addValue(){
        this.tower.Upgrade(10, 0 , 0);
    }

    Cost(){
        return this.lvl * 10;
    }
}

export class DamageUpgrade extends Upgrade{
    constructor(tower) {
        super('Damage', tower);
    }
}

export class RadiusUpgrade extends Upgrade{
    constructor(tower) {
        super('Radius', tower);
    }

    addValue() {
        this.tower.Upgrade(0, 5, 0);
    }
}

export class SpeedUpgrade extends Upgrade{
    constructor(tower) {
        super('Speed', tower);
    }

    addValue() {
        this.tower.Upgrade(0, 0, 2);
    }
}