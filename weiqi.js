
function Move() {
    var Move = {};
    
    var Point = null;
    var Map = null;
    
    var Nexts = [];
    
    Move.GetNext = function (i) {
        if (Nexts.length === 0 ) return null;
        if (!i) i = 0;
        return Nexts[i];
    };
    Move.AddNext = function (move) {
        Nexts.push(move);
    };
    return Move;
}
function Game() {
    var Game = {};
    var Root = null;
    var Father = null;
    var Now = null;
    
    return Game;
}

