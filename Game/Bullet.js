class Bullets{
    constructor(target, name='Bullet', damage= 1,speed = 5, position={X:0, Y: 0}) {
        this.damage = damage;
        this.name = name;
        this.position = position;
        this.speed = speed;
        this._target = target;
    }

    img = 'bullet.jpeg';

    Move(x, y){
        this.angle = Math.atan2(target.X - this.position.X, target.Y - this.position.Y);
        this.position.X += speed * Math.cos(this.angle);
        this.position.Y += speed * Math.sin(this.angle);
        //if(Math.abs(target.X - this.position.X) + Math.abs(target.Y - this.position.Y) < 1){

       // }
        return (Math.abs(target.X - this.position.X) + Math.abs(target.Y - this.position.Y)) < 1;
    }
}