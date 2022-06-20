import {DamageUpgrade, RadiusUpgrade, SpeedUpgrade} from "./Upgrade.js";
import Bullet from "./Bullet.js"

class Tower{
    constructor(damage= 1, radius=5, attackRadius = 25, attackSpeed = 10, position={X:0, Y: 0},) {
        this.damage = damage;
        this.radius = radius;
        this.attackRadius = attackRadius;
        this.position = {X:position.X, Y:position.Y};
        this.attackSpeed = attackSpeed; // выстрелов в тик / 1000
        //this.upgrades = [DamageUpgrade(this), RadiusUpgrade(this), SpeedUpgrade(this)];
        this.__cd = 1000; // для отслеживания кд выстрела
        this.img = 'img.jpeg';
    };

    static recharge = 40;

    CreateBullet(enemy) {
        return new Bullet(enemy.position, 'bullet', this.damage, 5, this.position);
    }

    Attack(enemies) {
        for (let enemy of enemies) {
            if (this.IsInAttackRadius(enemy)){
                return this.CreateBullet(enemy);
            }
        }
        return null;
    }

    Upgrade(dmg, rds, spd) {
        this.damage += dmg;
        this.attackRadius += rds;
        this.attackSpeed += spd;
    }

    SetPosition(x, y) {
        this.position = {X:x, Y: y}
    }

    IsInAttackRadius(enemy) {
        return Math.sqrt((enemy.position.X - this.position.X)**2 + (enemy.position.Y - this.position.Y)**2) < this.attackRadius;
    }

    Tick(enemies){
        if(this.__cd < 1000)
            this.__cd += this.attackSpeed;
        if(this.__cd >= 1000){
            let bullet = this.Attack(enemies);
            if(bullet !== null){
                this.__cd -= 1000;
                return bullet;
            }
        }
        return null;
    }
}

export class Laser extends Tower {
    constructor(position) {
        super(2, 25, position);
        this.img = 'laser.jpeg';
    }
    static name = 'Laser';
    static cost = 20;
    static shopImg = 'laser_shop.jpeg';
}

export class Turret extends Tower {
    constructor(position) {
        super(1, 50, position);
        this.img = 'turret.jpeg';
    }
    static name = 'Turret';
    static cost = 10;
    static shopImg = 'turret_shop.jpeg';
}

export class MegaImba extends Tower {
    constructor(position) {
        super(100, 1000, position);
        this.img = 'artemiy.jpeg';
    }
    static name = 'ArtemiyRogov';
    static cost = 100000;
    static shopImg = 'artemiy_shop.jpeg';
}