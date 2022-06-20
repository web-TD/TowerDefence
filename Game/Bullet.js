export default class Bullets{
    constructor(target, name='Bullet', damage= 1,speed = 5, position={X:0, Y: 0}) {
        this.damage = damage;
        this.name = name;
        this.position = {X:position.X, Y:position.Y};
        this.speed = speed;
        this._target = target;
        this.img = 'bullet.jpeg';
    }

    Move(x, y){
        this.angle = Math.atan2(this._target.Y - this.position.Y, this._target.X - this.position.X);
        this.position.X += this.speed * Math.cos(this.angle);
        this.position.Y += this.speed * Math.sin(this.angle);
        //if(Math.abs(target.X - this.position.X) + Math.abs(target.Y - this.position.Y) < 1){

       // }
        return (Math.abs(this._target.X - this.position.X) + Math.abs(this._target.Y - this.position.Y)) < 1;
    }
}