
function Node() {
    var Node = {};
    var Data = null;
    var Trees = [];
    return Node;
}

function Tree() {
    var Tree = {};
    var Nodes = [];

    Tree.Add = function (note) {
        Nodes.push(note);
    };
    Tree.Get = function (index) {
        return Nodes[index];
    };
    return Tree;
}

