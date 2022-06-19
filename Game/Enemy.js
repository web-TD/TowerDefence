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
        this.img = 'enemy.jpeg';
    };

    Move() {
        let angle = Math.atan2(this.target.X - this.position.X, this.target.Y - this.position.Y);
        this.position.X += this.speed * Math.cos(angle);
        this.position.Y += this.speed * Math.sin(angle);
        return (Math.abs(this.target.X - this.position.X) + Math.abs(this.target.Y - this.position.Y)) < 1;
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