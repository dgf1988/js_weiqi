
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.Str = function(){
    return '['+this.x+','+this.y+']';
}
Point.prototype.Clear = function() {
    this.x = null;
    this.y = null;
}
Point.prototype.Equals = function(p) {
    return p.x === this.x && p.y === this.y;
}
Point.prototype.Bool = function() {
    return !isNaN(this.x) && this.x >= 0 && !isNaN(this.y) && this.y >= 0;
}
Point.prototype.Clone = function() {
    return new Point(this.x, this.y);
}
Point.prototype.GetUp = function() {
    return new Point(this.x, this.y -1);
}
Point.prototype.GetDown = function() {
    return new Point(this.x, this.y +1);
}
Point.prototype.GetLeft = function() {
    return new Point(this.x-1, this.y);
}
Point.prototype.GetRight = function() {
    return new Point(this.x+1, this.y);
}

function PointSet() {
    this.set = [];
    if(arguments.length>0) {
        this.AddList(arguments);
    }
}
PointSet.prototype.Str= function() {
    var str_item = [];
    for( var i = 0; i< this.set.length; i++) {
        str_item.push(this.set[i].Str());
    }
    return str_item.join(', ');
}
PointSet.prototype.Bool = function(){
    return this.set.length > 0;
}
PointSet.prototype.Length = function(){
    return this.set.length;
}
PointSet.prototype.Has = function(p) {
    for( var i = 0; i<this.set.length; i++) {
        if (this.set[i].Equals(p)) {
            return true;
        }
    }
    return false;
}
PointSet.prototype.Clone = function() {
    var clone = new PointSet() ;
    for( var i = 0; i < this.set.length; i ++) {
        clone.set.push(this.set[i].Clone());
    }
    return clone;
}
PointSet.prototype.CloneToList = function() {
    var clone = [];
    for( var i = 0; i < this.set.length; i ++) {
        clone.push(this.set[i].Clone());
    }
    return clone;
}
PointSet.prototype.Equals = function(pset) {
    if( pset instanceof PointSet) {
        if (pset.set.length === this.set.length) {
            for(var i = 0; i< pset.set.length; i++) {
                if(!this.Has(pset.set[i])) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
PointSet.prototype.Add = function(p) {
    if(this.Has(p)) {
        return false;
    }
    this.set.push(p);
    return true;
}
PointSet.prototype.AddList= function(plist) {
    var news = [];
    for( var i = 0; i< plist.length; i++) {
        if( this.Add(plist[i])) {
            news.push(plist[i])
        }
    }
    return news;
}
PointSet.prototype.AddMany= function() {
    var news = [];
    for( var i = 0; i< arguments.length; i++) {
        if( this.Add(arguments[i])) {
            news.push(arguments[i])
        }
    }
    return news;
}
PointSet.prototype.Union = function(pset) {
    var news = [];
    for( var i = 0; i< pset.set.length; i++) {
        if( this.Add(pset.set[i])) {
            news.push(pset.set[i])
        }
    }
    return news;
}
PointSet.prototype.Remove = function(p) {
    for( var i = 0; i< this.set.length; i++) {
        if( this.set[i].Equals(p)) {
            this.set.splice(i, 1);
            return true;
        }
    }
    return false;
}
PointSet.prototype.Del = function(i) {
    this.set.splice(i, 1);
}
PointSet.prototype.Set = function(i, p) {
    this.set[i] = p;
}
PointSet.prototype.Find = function(p) {
    for(var i = 0; i < this.set.length; i++) {
        if (this.set[i].Equals(p)) {
            return i;
        }
    }
    return null;
}
PointSet.prototype.Get = function(i) {
    return this.set[i];
}
PointSet.prototype.Clear = function() {
    this.set = [];
}

function Cell(player, number) {
    this.player = player? player: 0;
    this.number = number? number: 0;
}

Cell.prototype.Str= function(){
    return '['+this.player+','+this.number+']';
}
Cell.prototype.Bool = function () {
    return !isNaN(this.player) && this.player >= 0 && !isNaN(this.number) && this.number >= 0;
}
Cell.prototype.Equals = function(c) {
    return c.player === this.player && c.number === this.number;
}
Cell.prototype.Clear = function() {
    this.player = 0;
    this.number = 0;
}
Cell.prototype.Clone = function() {
    return new Cell(this.player, this.number);
}

function CellMap(size) {
    this.size = size? size : 19;
    this.data = [];

    if(isNaN(this.size) || this.size <= 0 || this.size > 26) {
        this.size = 19;
    }
    for( var x = 0; x< this.size; x++) {
        var row = [];
        for( var y = 0; y< this.size; y++) {
            row.push(new Cell());
        }
        this.data.push(row);
    }
}
CellMap.prototype.Str = function() {
    var rows = [];
    for( var x = 0; x< this.size; x++) {
        var items = [];
        for( var y = 0; y< this.size; y++) {
            items.push(this.data[x][y].Str());
        }
        rows.push(items.join());
    }
    return rows.join('\r\n');
}
CellMap.prototype.StrPlayer = function() {
    var rows = [];
    for( var x = 0; x< this.size; x++) {
        var items = [];
        for( var y = 0; y< this.size; y++) {
            items.push(this.data[x][y].player);
        }
        rows.push(items.join());
    }
    return rows.join('\r\n');
}
CellMap.prototype.StrNumber = function() {
    var rows = [];
    for( var x = 0; x< this.size; x++) {
        var items = [];
        for( var y = 0; y< this.size; y++) {
            items.push(this.data[x][y].number);
        }
        rows.push(items.join());
    }
    return rows.join('\r\n');
}
CellMap.prototype.ForeachCell = function(f) {
    for( var x = 0; x< this.size; x++) {
        for( var y = 0; y< this.size; y++) {
            f(this.data[x][y]);
        }
    }
}
CellMap.prototype.Clone = function() {
    var map = new CellMap(this.size);
    for( var x = 0; x < this.size; x ++) {
        for( var y = 0; y < this.size; y ++) {
            map.data[x][y] = this.data[x][y].Clone();
        }
    }
    return map;
}
CellMap.prototype.Clear = function() {
    for( var x = 0; x< this.size; x++) {
        for( var y = 0; y< this.size; y++) {
            this.data[x][y].Clear();
        }
    }
}

CellMap.prototype.HasPoint = function(p) {
    if( p && p instanceof Point && p.Bool() ) {
        if( p.x < this.size && p.y < this.size) {
            return true;
        }
    }
    return false;
}
CellMap.prototype.HasPlayer = function(p) {
    return this.data[p.x][p.y].player > 0;
}
CellMap.prototype.HasNumber = function(p) {
    return this.data[p.x][p.y].number > 0;
}
CellMap.prototype.HasPlayerAndNumber = function(p) {
    return this.HasPlayer(p) && this.HasNumber(p);
}

CellMap.prototype.ClearByPoint = function(p) {
    this.data[p.x][p.y].Clear();
}
CellMap.prototype.ClearByPointSet = function(pointset){
    for( var i = 0; i< pointset.Length(); i++) {
        var p = pointset.Get(i);
        this.data[p.x][p.y].Clear();
    }
    return pointset.Length();
}
CellMap.prototype.ClearByPointList = function(pointlist ) {
    for( var i = 0; i < pointlist.length; i++) {
        var p = pointlist[i];
        this.data[p.x][p.y].Clear();
    }
    return pointlist.length;
}

CellMap.prototype.SetCellByPoint = function(p, cell) {
    this.data[p.x][p.y] = cell;
}
CellMap.prototype.SetPlayerByPoint = function(p, player) {
    this.data[p.x][p.y].player = player;
}
CellMap.prototype.SetNumberByPoint = function(p, number) {
    this.data[p.x][p.y].number = number;
}


