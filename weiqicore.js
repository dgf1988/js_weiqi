/**
 *
 * Created by 国锋 on 2017/6/27.
 */

var WEIQI_ERROR = -1;
var WEIQI_LIFE = 0 ;
var WEIQI_BLACK = 1;
var WEIQI_WHITE = 2;
var WEIQI_MIN_SIZE = 9;
var WEIQI_DEFAULT_SIZE = 19;
var WEIQI_MAX_SIZE = 26;

/**
 * @return {null}
 */
var NextPlayer = function (player) {
    if (player === WEIQI_BLACK) return WEIQI_WHITE;
    if (player === WEIQI_WHITE) return WEIQI_BLACK;
    return null;
};

var WeiqiPlayers = function (number) {
	var Players = {};
	var Number = number;
	if (isNan(Number) || Number <=0) return null;
	var Player = 1;
	
	Players.GetNumber = function () {
		return Number;
	};
	Players.Get = function() {
		return Player;
	};
	Players.Next = function () {
		Player = Player + 1;
		if (Player > Number ) {
			Player = 1;
		}
		return Players;
	};
	
	return Players;

};

/**
 *
 * 点的计算。
 * 参数必须。
 */
function WeiqiPoint(x, y) {
    var Point = {};
    var X = x;
    var Y = y;

    /**
	 * 检测对象是否有值。
     * @return {boolean}
     */
    Point.Bool = function () {
        return !(isNaN(X) || isNaN(Y));
    };

    Point.X = function () {
        return X;
    };
    Point.Y = function () {
        return Y;
    };

    /**
     * @return {boolean}
     */
    Point.Equals = function (point) {
		return point.X() === X && point.Y() === Y;
	};
	//复制
    Point.Copy = function () {
        return WeiqiPoint(X, Y);
    };
	//向上取一点。
    Point.GetUp = function () {
        return WeiqiPoint(X, Y-1);
    };

	//向下取一点。
    Point.GetDown = function () {
        return WeiqiPoint(X, Y+1);
    };

	//向左取一点。
    Point.GetLeft = function () {
        return WeiqiPoint(X-1, Y);
    };

	//向右取一点。
    Point.GetRight = function () {
        return WeiqiPoint(X+1, Y);
    };
	//字符串化。
    /**
     * @return {string}
     */
    Point.Str = function() {
		return "["+X+","+Y+"]";
	};

    return Point;
}

//参数可选。
function WeiqiPointSet(points) {
	var Set = {};
	
	var Data = [];

    /**
     * @return {boolean}
     */
    Set.Bool = function () {
		return Data.length > 0;
	};
	
	Set.Length = function () {
		return Data.length;
	};
    /**
     * @return {boolean}
     */
    Set.Add = function (point) {
		for( var i = 0 ; i < Data.length; i++) {
			if ( point.Equals(Data[i])) return false;
		}
		Data.push(point) ;
		return true;
	};
    /**
     * @return {boolean}
     */
    Set.Del = function (point) {
		for( var i = 0 ; i < Data.length; i++) {
			if ( point.Equals(Data[i])){
				Data.splice(i, 1);
				return true;
			}
		}
		return false;
	};

    Set.Get = function (i) {
        return Data[i];
    };

    /**
     * @return {boolean}
     */
    Set.Has = function (point) {
		for( var i = 0 ; i < Data.length; i++) {
			if ( point.Equals(Data[i])){
				return true;
			}
		}
		return false;
	};
    /**
     * @return {number}
     */
    Set.AddList = function (points) {
		var news = [];
		for(var i = 0 ; i < points.length; i++) {
			if (Set.Add(points[i])) {
				news.push(points[i]);
			}
		}
		return news;
	};

	Set.AddSet = function (pointset) {
		var news = [];
		for(var i = 0 ; i < pointset.Length(); i++) {
			if (Set.Add(pointset.Get(i))) {
				news.push(pointset.Get(i));
			}
		}
		return news;
	};

	Set.CopyToList = function () {
		var pointlist = [];
		for( var i = 0 ; i<Data.length; i++) {
			pointlist.push(Data[i]);
		}
		return pointlist;
	};
    /**
     * @return {string}
     */
    Set.Str = function (){
		var items = [];
		for( var i = 0 ; i<Data.length; i++) {
			items.push(Data[i].Str());
		}
		return items.join();
	};
	
	//可以使用列表做初始化。
	if (points && points.length > 0) {
		Set.AddList(points);
	}
	
	return Set;
}

//参数可选。
function WeiqiMap(size) {
    var Map = {};

    //棋盘大小设置。
    var Size = size;
    if (isNaN(Size)) {
        Size = WEIQI_DEFAULT_SIZE;
    } else if (Size < WEIQI_MIN_SIZE) {
        Size = WEIQI_MIN_SIZE;
    } else if (Size > WEIQI_MAX_SIZE) {
        Size = WEIQI_MAX_SIZE;
    }

    //初始化数据。
    var Data = [];
    for( var x = 0; x < Size; x ++) {
        var row = [];
        for( var y = 0; y < Size; y ++) {
            row.push(0);
        }
        Data.push(row);
    }

    Map.GetSize = function () {
        return Size;
    };
    /**
     * @return {boolean}
     */
    Map.HasPoint = function (point) {
        return point.X() < Size && point.Y() < Size && point.X() >= 0 && point.Y() >= 0;
    };

    /**
     * @return {boolean}
     */
    Map.HasPlayer = function (point) {
        return Data[point.X()][point.Y()]  > 0;
    };

    Map.Get = function (point) {
        return Data[point.X()][point.Y()];
    };

    Map.Set = function (point, player) {
        Data[point.X()][point.Y()] = player;
    };

    Map.SetList = function (point_list, val) {
        for( var i=0; i<point_list.length; i++) {
            Map.Set(point_list[i], val);
        }
    };

    Map.SetSet = function (point_set, val) {
        for( var i=0; i<point_set.Length(); i++) {
            Map.Set(point_set.Get(i), val);
        }
    };

    Map.ClearSet = function (point_set) {
        Map.SetSet(point_set, 0);
        return point_set.Length();
    };

    Map.Foreach = function (func) {
        for( var x = 0; x < Size; x ++) {
            for( var y = 0; y < Size; y ++) {
                var point = WeiqiPoint(x, y);
                func(point, Map.Get(point));
            }
        }
    };

    Map.Copy = function () {
        var map = WeiqiMap(Size);
        Map.Foreach(function (point, player) {
            map.Set(point, player);
        });
        return map;
    };

    /**
     * @return {boolean}
     */
    Map.Equals = function (map) {
        if (map.GetSize() !== Map.GetSize()) {
            return false;
        }
        for( var x = 0; x < Size; x ++) {
            for( var y = 0; y < Size; y ++) {
                var point = WeiqiPoint(x, y);
                if( map.Get(point) !== Map.Get(point)) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * @return {null}
     */
    Map.GetUp = function (point, player) {
		var p = point.GetUp();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetDown = function (point, player) {
		var p = point.GetDown();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetLeft = function (point, player) {
		var p = point.GetLeft();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetRight = function (point, player) {
		var p = point.GetRight();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

	Map.GetNear = function (point, player) {
		var point_list = [];
		var up = Map.GetUp(point, player);
		if (up) {
			point_list.push(up);
		}
		var down = Map.GetDown(point, player);
		if (down) {
			point_list.push(down);
		}
		var left = Map.GetLeft(point, player);
		if (left) {
			point_list.push(left);
		}
		var right = Map.GetRight(point, player);
		if (right) {
			point_list.push(right);
		}
		return point_list;
	};
	
	Map.SearchAround = function(point, player, pointset) {
		var near_list = Map.GetNear(point, player);
		var new_list = pointset.AddList(near_list);
		for(var i = 0; i < new_list.length; i++) {
			Map.SearchAround(new_list[i], player, pointset);
		}
	};
	
	Map.GetAround = function(point, player) {
		var pointset = WeiqiPointSet();
		pointset.Add(point);
		Map.SearchAround(point, player, pointset);
		return pointset;
	};
	
	Map.GetLives = function( pointset ) {
		var lives = WeiqiPointSet();
		for( var i = 0 ; i<pointset.Length(); i++) {
			var points = Map.GetNear(pointset.Get(i), WEIQI_LIFE);
			if (points.length > 0 )
				lives.AddList(points);
		}
		/* 
		for( var i = 0 ; i<pointset.Length(); i++) {
			lives.Del(pointset.Get(i));
		}
		*/
		return lives;
	};
	
    return Map;
}

//创建一步棋。
//MAP 必须。
//POINT 可选，无值则PASS一手。
//PLAYER 可选，无值则PASS一手。
/**
 * @return {null}
 */
function WeiqiMove(map, point, player) {
    var Move = {};
    var Map = map;
    var Point = point;
    var Player = player;
    var Tree = null;
	
    Move.GetMap = function () {
        return Map;
    };

    Move.GetPoint = function () {
        return Point;
    };

    Move.GetPlayer = function () {
        return Player;
    };
	
	Move.SetTree = function (tree) {
		Tree = tree;
	};

    /**
     * @return {boolean}
     */
    Move.HasTree = function () {
		return Tree  && Tree.Bool();
	};

	if (!Map ) {
		return null;
	}
    if (Point && Point.Bool() && Player>0 && Map.HasPoint(Point)) {
        if (Map.HasPlayer(Point)) {
            return null;
        }
        Map.Set(Point, Player);

        var other_player = NextPlayer(Player);
        var eat_number = 0;

        var up = Point.GetUp();
        if (Map.HasPoint(up)) {
            var other_up = Map.GetAround(up, other_player);
            var other_up_lives = Map.GetLives(other_up);
            if (other_up_lives.Length()===0) {
                eat_number += Map.ClearSet(other_up);
            }
        }

        var down = Point.GetDown();
        if (Map.HasPoint(down)) {
            var other_down = Map.GetAround(down, other_player);
            var other_down_lives = Map.GetLives(other_down);
            if (other_down_lives.Length()===0) {
                eat_number += Map.ClearSet(other_down);
            }
        }

        var left = Point.GetLeft();
        if (Map.HasPoint(left)) {
            var other_left = Map.GetAround(left, other_player);
            var other_left_lives = Map.GetLives(other_left);
            if (other_left_lives.Length()===0) {
                eat_number += Map.ClearSet(other_left);
            }
        }

        var right = Point.GetRight();
        if (Map.HasPoint(right)) {
            var other_right = Map.GetAround(right, other_player);
            var other_right_lives = Map.GetLives(other_right);
            if (other_right_lives.Length()===0) {
                eat_number += Map.ClearSet(other_right);
            }
        }

        var mypointset = Map.GetAround(Point, Player);
        var mypointlives = Map.GetLives(mypointset);

        if (eat_number > 0) {

        } else {
            if (mypointlives.Length() === 0) {
                return null;
            }
        }
        console.log('棋形：', mypointset.Str());
        console.log('生命：', mypointlives.Str());
    }



    return Move;
}

function WeiqiMoveTree() {
	var Tree = {};
	var Data = [];

    /**
     * @return {boolean}
     */
    Tree.Bool = function () {
        return Data.length > 0;
    };

    Tree.Length = function () {
        return Data.length;
    };
	
	Tree.Add = function (move) {
		Data.push(move);
	};
	
	Tree.Del = function (i) {
		Data.splice(i, 1);
	};
	
	Tree.Set = function (i, move) {
		Data[i] = move;
	};

    /**
     * @return {null}
     */
    Tree.Get = function (i) {
	    if (i<0) {
	        i = Data.length+i;
        }
        if (i < 0 ) {
	        return null;
        }
		return Data[i];
	};
	
	return Tree;
}

function WeiqiDrive(map, players) {
    var Drive = {};

	var Players = players;
    var Moves = WeiqiMoveTree();
	Moves.Add(WeiqiMove(map));
	
	Drive.Move = function (point, player) {
		
	};
	Drive.Get = function (number) {};
	Drive.Delete = function (number) {};
	Drive.AddBranch = function () {};
	Drive.DelBranch = function () {};
	Drive.ToSgf = function () {};
	
	
    return Drive;
}

function WeiqiUnit(map, next_player) {
    var Unit = {};

    var Tree = WeiqiMoveTree();
    var NextPlayer = next_player;
    Tree.Add(WeiqiMove(map));
    Unit.GetTree = function () {
        return Tree;
    };
    /**
     * @return {boolean}
     */
    Unit.Move = function (point, player) {
		console.log('落子', point.Str());
        if (!player) {
            player = NextPlayer;
        }
        var move = WeiqiMove(Tree.Get(-1).GetMap().Copy(), point, player);
        if (move) {
            var lastmove = Tree.Get(-2);
            if (lastmove) {
                var lastmap = lastmove.GetMap();
                if (lastmap.Equals(move.GetMap())) {
                    return false;
                }
            }
            Tree.Add(move);
            NextPlayer = player === 1 ? 2: 1;
            return true;
        }
        return false;
    };

    Unit.Goto = function (number) {
        return Moves[number];
    };

    return Unit;
}
