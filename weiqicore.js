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
	Point.Str = function() {
		return "["+X+","+Y+"]";
	};

    return Point;
}

//参数可选。
function WeiqiPointSet(points) {
	var Set = {};
	
	var Data = [];
	
	Set.Bool = function () {
		return Data.length > 0;
	};
	
	Set.Length = function () {
		return Data.length;
	};
	Set.Get = function (i) {
		return Data[i];
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
	Set.Del = function (point) {
		for( var i = 0 ; i < Data.length; i++) {
			if ( point.Equals(Data[i])){
				Data.splice(i, 1);
				return true;
			}
		}
		return false;
	};
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

    Map.GetSize = function () {
        return Size;
    };
    /**
     * @return {boolean}
     */
    Map.HasPoint = function (point) {
        return point.X() < Size && point.Y() < Size && point.X() >= 0 && point.Y() >= 0;
    };

	//初始化数据。
    var Data = [];
    for( var x = 0; x < Size; x ++) {
        var row = [];
        for( var y = 0; y < Size; y ++) {
            row.push(0);
        }
        Data.push(row);
    }

    Map.Get = function (point) {
        return Data[point.X()][point.Y()];
    };

    Map.Set = function (point, player) {
        Data[point.X()][point.Y()] = player;
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
     * @return {null}
     */
    Map.GetUpPointByPlayer = function (point, player) {
		var p = point.GetUp();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetDownPointByPlayer = function (point, player) {
		var p = point.GetDown();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetLeftPointByPlayer = function (point, player) {
		var p = point.GetLeft();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

    /**
     * @return {null}
     */
    Map.GetRightPointByPlayer = function (point, player) {
		var p = point.GetRight();
		if( Map.HasPoint(p) && Map.Get(p) === player ) {
			return p;
		}
		return null;
	};

	Map.GetNearPointListByPlayer = function (point, player) {
		var point_list = [];
		var up = Map.GetUpPointByPlayer(point, player);
		if (up) {
			point_list.push(up);
		}
		var down = Map.GetDownPointByPlayer(point, player);
		if (down) {
			point_list.push(down);
		}
		var left = Map.GetLeftPointByPlayer(point, player);
		if (left) {
			point_list.push(left);
		}
		var right = Map.GetRightPointByPlayer(point, player);
		if (right) {
			point_list.push(right);
		}
		return point_list;
	};
	
	Map.SearchAroundPointSetByPlayer = function(point, player, pointset) {
		var pointlist = Map.GetNearPointListByPlayer(point, player);
		var newpoints = pointset.AddList(pointlist);
		for(var i = 0; i<newpoints.length; i++) {
			Map.SearchAroundPointSetByPlayer(newpoints[i], player, pointset);
		}
	};
	
	Map.GetAroundPointSetByPlayer = function(point, player) {
		var pointset = WeiqiPointSet();
		Map.SearchAroundPointSetByPlayer(point, player, pointset);
		pointset.Add(point);
		return pointset;
	};
	
	Map.GetLivesByPointSet = function( pointset ) {
		var lives = WeiqiPointSet();
		for( var i = 0 ; i<pointset.Length(); i++) {
			var points = Map.GetNearPointListByPlayer(pointset.Get(i), WEIQI_LIFE);
			if (points.length > 0 )
				lives.AddList(points);
		}
		for( var i = 0 ; i<pointset.Length(); i++) {
			lives.Del(pointset.Get(i));
		}
		return lives;
	};
	
    return Map;
}

//创建一步棋。
//MAP 必须。
//POINT 可选，无值则PASS一手。
//PLAYER 可选，无值则PASS一手。
function WeiqiMove(map, point, player) {
    var Move = {};
    var Map = map;
    var Point = point;
    var Player = player;

    Move.Bool = function () {
        return Map && Point && !isNaN(Player);
    };

    Move.GetMap = function () {
        return Map;
    };

    Move.GetPoint = function () {
        return Point;
    };

    Move.GetPlayer = function () {
        return Player;
    };

    return Move;
}

function WeiqiUnit(map, next_player) {
    var Unit = {};

    var Moves = [];
    var NextPlayer = next_player;
    Moves.push(WeiqiMove(map));

    Unit.GetLastMove = function () {
        return Moves[Moves.length-1];
    };

    Unit.Move = function (point, player) {
		console.log(point.Str());
        if (!player) {
            player = NextPlayer;
        }
        var lastmap = Unit.GetLastMove().GetMap().Copy();
		var set = lastmap.GetAroundPointSetByPlayer(point, player);
		console.log("棋子：", set.Str());
		var lives = lastmap.GetLivesByPointSet(set);
		console.log("生命：", lives.Str());
        lastmap.Set(point, player);
        var move = WeiqiMove(lastmap, point, player);
        Moves.push(move);
        NextPlayer = player === 1 ? 2: 1;
    };

    Unit.Goto = function (number) {
        return Moves[number];
    };

    return Unit;
}