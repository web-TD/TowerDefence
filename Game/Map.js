export default class Map{
    constructor(
        levelNumber,
        width = 1920,
        height = 1080,
        enemyPath = [{X:0, Y:0}, {X:1920, Y:1080}],
        pathRadius = 20) {
        this.width = width;
        this.height = height;
        this.enemyPath = enemyPath;
        this.pathRadius = pathRadius;
        this.img = `assets/level_maps/${levelNumber}.png`;
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
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
    let l2 = dist2(v, w);
    if (l2 === 0)
        return dist2(p, v);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, { x: v.x + t * (w.x - v.x),
        y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }