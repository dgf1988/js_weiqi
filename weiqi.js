var WEIQI_POINT_MAX = 26;


function WeiqiPoint(x, y) {
    this.x = x;
    this.y = y;
}

WeiqiPoint.prototype = {
    constructor: WeiqiPoint,
    ToString: function() {
        return '['+this.x+','+this.y+']';
    },
    Bool: function() {
        return !isNaN(this.x) && !isNaN(this.y) && this.x > 0 && this.y > 0 ; 
    },
    Equals: function(p) {
        return p.x === this.x && p.y === this.y;
    },
    GetCopy: function() {
        return new WeiqiPoint(this.x, this.y);
    },
    GetUp: function() {
        return new WeiqiPoint(this.x, this.y-1);
    },
    GetDown: function() {
        return new WeiqiPoint(this.x, this.y+1);
    },
    GetLeft: function() {
        return new WeiqiPoint(this.x-1, this.y);
    },
    GetRight: function() {
        return new WeiqiPoint(this.x+1, this.y);
    }
}

var p1 = new WeiqiPoint();
console.log(p1.ToString(), p1.Bool());
var p2 = new WeiqiPoint(1, 2);
console.log(p2.ToString(), p2.Bool());
console.log(p2.Equals(new WeiqiPoint(1, 2)) === true );
console.log(p2.Equals(new WeiqiPoint(2, 2)) === false);
console.log(p2.Equals(p2.GetCopy()) === true);
console.log(p2.ToString(), p2.GetDown().ToString(), p2.GetUp().ToString(), p2.GetLeft().ToString(), p2.GetRight().ToString());


function WeiqiPointSet(ps) {
    this.data = [];
    if(ps && ps.length > 0) {
        this.AddList(ps);
    }
}

WeiqiPointSet.prototype = {
    constructor: WeiqiPointSet,
    Bool: function() {
        return this.data.length > 0;
    },
    Length: function() {
        return this.data.length;
    },
    Equals: function(pset){
        if (pset.Length() === this.data.length) {
            for (var i = 0; i<pset.Length(); i++) {
                if(!this.Has(pset.Get(i))) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    GetCopy: function() {
        var copy = new WeiqiPointSet();
        for( var i = 0; i<this.Length(); i++) {
            copy.Add(this.Get(i));
        }
        return copy;
    },
    GetCopyList: function() {
        var copy = [];
        for( var i = 0; i< this.Length(); i++) {
            copy.push(this.Get(i));
        }
        return copy;
    },
    Add: function(p) {
        for( var i = 0; i< this.data.length; i++) {
            if (this.data[i].Equals(p)) {
                return false;
            }
        }
        this.data.push(p);
        return true;
    },
    AddList: function(ps) {
        var news = [];
        for( var i = 0; i< ps.length; i++){
            if (this.Add(ps[i])) {
                news.push(ps[i]);
            }
        }
        return news;
    },
    Union: function(pset) {
        var news = [];
        for( var i = 0; i< pset.Length(); i++) {
            var p = pset.Get(i);
            if( this.Add(p)) {
                news.push(p);
            }
        }
        return news;
    },
    Del: function(i) {
        this.data.splice(i, 1);
    },
    Set: function(i, p) {
        this.data[i] = p;
    },
    Get: function(i) {
        return this.data[i];
    },
    Has: function(p) {
        for( var i = 0; i< this.data.length; i++) {
            if ( this.data[i].Equals(p)) {
                return true;
            }
        }
        return false;
    },
    ToString: function() {
        var item = [];
        for( var i = 0; i < this.data.length; i++) {
            item.push(this.data[i].ToString());
        }
        return item.join();
    }
}

var s1 = new WeiqiPointSet();
console.log(s1.Bool() === false, s1.Length() === s1.data.length);
console.log(s1.Add(new WeiqiPoint(1,1)) === true, s1.Add(new WeiqiPoint(1, 1)) === false);
s1.Del(-1);
console.log(s1.Length() === 0);
var s2 = new WeiqiPointSet([new WeiqiPoint(1,1), new WeiqiPoint(2, 2), new WeiqiPoint(), new WeiqiPoint(1, 2)]);
console.log(s2.ToString(), s2.Equals(s2.GetCopy()));
s2.Del(-2);
console.log(s2.ToString());

function WeiqiCell(player, number) {
    this.player = player;
    this.number = number;
}

WeiqiCell.prototype = {
    constructor: WeiqiCell,
    Clear: function() {
        this.player = 0;
        this.number = 0;
    },
    Bool: function() {
        
    }
}