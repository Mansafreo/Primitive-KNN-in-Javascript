//File that stores the distance metrics and their related functions
function euclideanDistance(p1, p2){
    //Euclidean distance
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}
function manhattanDistance(p1, p2){
    //Manhattan distance
    return Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y);
}
function chebyshevDistance(p1, p2){
    //Chebyshev distance
    return Math.max(Math.abs(p1.x-p2.x),Math.abs(p1.y-p2.y));
}
function minkowskiDistance(p1, p2, p){
    //Minkowski distance
    return Math.pow(Math.pow(Math.abs(p1.x-p2.x),p)+Math.pow(Math.abs(p1.y-p2.y),p),1/p);
}
module.exports = {euclideanDistance, manhattanDistance, chebyshevDistance, minkowskiDistance};