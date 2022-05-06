//export default class Tower{
class Tower{
    constructor(name='Tower', damage=1, radius=25, cost=0, health = 10, position={X:0, Y: 0}) {
        this.damage = damage;
        this.radiusAttack = radius;
        this.cost = cost;
        this.name = name;
        this.health = health;
        this.position = position;
    };

    img = 'img.jpeg';
    recharge = 40;
    Attack(enemies) {};
    Upgrade(dmg, rds, hp){
        this.damage += dmg;
        this.radiusAttack += rds;
        this.health += hp;
    }

    SetPosition(x, y){
        this.position = {X:x, Y: y}
    }

    // Damage(dmg){
    //     this.health -= dmg;
    // }

    InRadiusAttack(enemy){
        return Math.sqrt((enemy.position.X - this.position.X)**2 + (enemy.position.Y - this.position.Y)**2) < this.radiusAttack;
    }
}

class Enemy {
    hp = 10;
    position = {X:0, Y:0}

    SetPosition(x, y){
        this.position = {X:x, Y: y}
    }
}

var enemies = [new Enemy(), new Enemy()]

class Laser extends Tower{
    constructor(name='Laser', damage = 2, radius = 25, cost = 20) {
        super(name, damage, radius, cost);

        this.img = 'laser.jpeg';
    }

    Attack(enemies) {
        var enemy = enemies[0];
        var tower = this;

        if(enemy.hp > 0)
            enemy.hp -= tower.damage;
    }
}

class Turrel extends Tower{
    constructor(name='Turrel', damage = 1, radius = 50, cost = 10) {
        super(name, damage, radius, cost);

        this.img = 'turrel.jpeg';
    }

    Attack(enemies) {

        enemies.forEach(function (enemy){
            var tower = this;
            if(enemy.hp > 0)
                enemy.hp -= tower.damage;
    })};
}

class MegaImba extends Tower{
    constructor(name='ArtemiyRogov', damage = 100, radius = 1000, cost = 100000, position) {
        super(name, damage, radius, cost);

        this.img = 'artemiy.jpeg';
    }

    Attack(enemies) {

        enemies.forEach(function (enemy){
            var tower = this;
            if(enemy.hp > 0)
                enemy.hp -= tower.damage;
        })};
}

var tower = new Laser();
var enemy = new Enemy();
enemy.SetPosition(24, 51);

console.log(tower.InRadiusAttack(enemy))