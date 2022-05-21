//export default class Tower{
class Tower {
    constructor(damage=1, radius=25, position={X:0, Y: 0}) {
        this.damage = damage;
        this.attackRadius = radius;
        this.position = position;
    };

    img = 'img.jpeg';
    recharge = 40;

    Attack(enemies) {
        for (let enemy of enemies) {
            if (this.IsInAttackRadius(enemy)){
                //TODO shoot, damage
            }
        }
    }

    Upgrade(dmg, rds, hp) {
        this.damage += dmg;
        this.attackRadius += rds;
        this.health += hp;
    }

    SetPosition(x, y) {
        this.position = {X:x, Y: y}
    }

    IsInAttackRadius(enemy) {
        return Math.sqrt((enemy.position.X - this.position.X)**2 + (enemy.position.Y - this.position.Y)**2) < this.attackRadius;
    }
}

class Enemy {
    hp = 10;
    position = {X:0, Y:0}

    SetPosition(x, y) {
        this.position = {X:x, Y: y}
    }

    TakeDamage(damage) {
        this.hp -= damage;
        if (this.hp < 0)
            this.hp = 0;
    }
}

class Laser extends Tower {
    constructor(position) {
        super(2, 25, position);
        this.img = 'laser.jpeg';
    }
    static name = 'Laser';
    static cost = 20;
    static shopImg = 'laser_shop.jpeg';
}

class Turret extends Tower {
    constructor(position) {
        super(1, 50, position);
        this.img = 'turret.jpeg';
    }
    static name = 'Turret';
    static cost = 10;
    static shopImg = 'turret_shop.jpeg';
}

class MegaImba extends Tower {
    constructor(position) {
        super(100, 1000, position);
        this.img = 'artemiy.jpeg';
    }
    static name = 'ArtemiyRogov';
    static cost = 100000;
    static shopImg = 'artemiy_shop.jpeg';
}