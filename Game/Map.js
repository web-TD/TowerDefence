import {getImage} from "../utils.js";

export default class Map{
    constructor(
        levelNumber,
        width = 1920,
        height = 1080,
        pathRadius = 20) {
        this.width = width;
        this.height = height;
        this.enemyPath = [{X:235, Y:756}, {X:235, Y:335}, {X:775, Y:335}, {X:775, Y:50}];
        this.pathRadius = pathRadius;
        this.img = getImage(`../assets/level_maps/${levelNumber}.png`);
    }

    getDistanceToPath(point){
        let res = Math.sqrt(this.width * this.width + this.height * this.height)
        for(let i = 1; i < this.enemyPath.length; i++){
            res = Math.min(res, distToSegment(point, this.enemyPath[i], this.enemyPath[i - 1]));
        }
        return res;
    }
}

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.X - w.X) + sqr(v.Y - w.Y) }
function distToSegmentSquared(p, v, w) {
    let l2 = dist2(v, w);
    if (l2 === 0)
        return dist2(p, v);
    let t = ((p.X - v.X) * (w.X - v.X) + (p.Y - v.Y) * (w.Y - v.Y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, { X: v.X + t * (w.X - v.X),
        Y: v.Y + t * (w.Y - v.Y) });
}

function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }