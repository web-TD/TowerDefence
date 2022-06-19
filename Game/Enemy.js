export default class Enemy {
    constructor(position, target, health= 10, speed = 1, radius = 5, reward = 4) {
        this.health = health;
        this.maxHealth = health;
        this.position = position;
        this.speed = speed;
        this.target = target;
        this.radius = radius;
        this.targetId = 1;
        this.isLive = true
        this.reward = reward;
    };

    static img = 'enemy.jpeg';

    Move() {
        let angle = Math.atan2(target.X - this.X, target.Y - this.Y);
        this.position.X += speed * Math.cos(angle);
        this.position.Y += speed * Math.sin(angle);
        return (Math.abs(target.X - this.position.X) + Math.abs(target.Y - this.position.Y)) < 1;
    }

    SetTarget(target){
        this.target = target;
        this.targetId++;
    }

    TakeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0)
            this.Die();
    }

    Die(){
        this.isLive = false;
    }
}