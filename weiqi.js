
function Move() {
    var Move = {};
    var Data = null;
    var Moves = [];
    Move.Next = function () {
        if (Moves.length === 0 ) return null;
        return Moves[0];
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

