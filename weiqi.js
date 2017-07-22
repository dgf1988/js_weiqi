

var WEIQI_ERROR = -1;
var WEIQI_LIFE = 0;
var WEIQI_BLACK = 1;
var WEIQI_WHITE = 2;
var WEIQI_MIN_PLAYER_NUMBER = 2;
var WEIQI_DEFAULT_PLAYER_NUMBER = 2;
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
        return WeiqiPoint(X, Y - 1);
    };

    //向下取一点。
    Point.GetDown = function () {
        return WeiqiPoint(X, Y + 1);
    };

    //向左取一点。
    Point.GetLeft = function () {
        return WeiqiPoint(X - 1, Y);
    };

    //向右取一点。
    Point.GetRight = function () {
        return WeiqiPoint(X + 1, Y);
    };
    //字符串化。
    /**
     * @return {string}
     */
    Point.Str = function () {
        return "[" + X + "," + Y + "]";
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
        for (var i = 0; i < Data.length; i++) {
            if (point.Equals(Data[i])) return false;
        }
        Data.push(point);
        return true;
    };
    /**
     * @return {boolean}
     */
    Set.Del = function (point) {
        for (var i = 0; i < Data.length; i++) {
            if (point.Equals(Data[i])) {
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
        for (var i = 0; i < Data.length; i++) {
            if (point.Equals(Data[i])) {
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
        for (var i = 0; i < points.length; i++) {
            if (Set.Add(points[i])) {
                news.push(points[i]);
            }
        }
        return news;
    };

    Set.AddSet = function (pointset) {
        var news = [];
        for (var i = 0; i < pointset.Length(); i++) {
            if (Set.Add(pointset.Get(i))) {
                news.push(pointset.Get(i));
            }
        }
        return news;
    };

    Set.Copy = function() {
        var set = WeiqiPointSet();
        for (var i = 0; i < Data.length; i++) {
            set.Add(Data[i]);
        }
        return set;
    };

    Set.CopyToList = function () {
        var pointlist = [];
        for (var i = 0; i < Data.length; i++) {
            pointlist.push(Data[i]);
        }
        return pointlist;
    };
    /**
     * @return {string}
     */
    Set.Str = function () {
        var items = [];
        for (var i = 0; i < Data.length; i++) {
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

function WeiqiMapCell(player, number) {
    var Cell = {};
    var Player = player;
    var Number = number;
    Cell.Bool = function() {
        return !isNaN(Player) && !isNaN(Number) && Player > 0 && Number >= 0;
    }
    Cell.Clear = function() {
        Player = 0;
        Number = 0;
    }
    Cell.GetPlayer = function() { return Player; };
    Cell.GetNumber = function() { return Number; };
    Cell.Equals = function(cell) {
        return cell.GetPlayer === Cell.GetPlayer && cell.GetNumber === Cell.GetNumber;
    }
    Cell.Copy = function() {
        var cell = WeiqiMapCell(Player, Number);
        return cell;
    }
    return Cell;
}

//参数可选。
function WeiqiMap(size) {
    var Map = {};

    //棋盘大小设置。
    var Size = size;
    //初始化数据。
    var Data = [];

    for (var x = 0; x < Size; x++) {
        var row = [];
        for (var y = 0; y < Size; y++) {
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
        return Data[point.X()][point.Y()] > 0;
    };

    Map.Get = function (point) {
        return Data[point.X()][point.Y()];
    };

    Map.Set = function (point, val) {
        Data[point.X()][point.Y()] = val;
    };

    Map.SetList = function (point_list, val) {
        for (var i = 0; i < point_list.length; i++) {
            Map.Set(point_list[i], val);
        }
    };

    Map.SetSet = function (point_set, val) {
        for (var i = 0; i < point_set.Length(); i++) {
            Map.Set(point_set.Get(i), val);
        }
    };

    Map.ClearSet = function (point_set) {
        Map.SetSet(point_set, 0);
        return point_set.Length();
    };

    Map.Foreach = function (func) {
        for (var x = 0; x < Size; x++) {
            for (var y = 0; y < Size; y++) {
                var point = WeiqiPoint(x, y);
                func(point, Map.Get(point));
            }
        }
    };

    Map.Copy = function () {
        var map = WeiqiMap(Size);
        Map.Foreach(function (point, val) {
            map.Set(point, val);
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
        for (var x = 0; x < Size; x++) {
            for (var y = 0; y < Size; y++) {
                var point = WeiqiPoint(x, y);
                if (map.Get(point) !== Map.Get(point)) {
                    return false;
                }
            }
        }
        return true;
    };

    /**
     * @return {null}
     */
    Map.GetUp = function (point, val) {
        var p = point.GetUp();
        if (Map.HasPoint(p) && Map.Get(p) === val) {
            return p;
        }
        return null;
    };

    /**
     * @return {null}
     */
    Map.GetDown = function (point, val) {
        var p = point.GetDown();
        if (Map.HasPoint(p) && Map.Get(p) === val) {
            return p;
        }
        return null;
    };

    /**
     * @return {null}
     */
    Map.GetLeft = function (point, val) {
        var p = point.GetLeft();
        if (Map.HasPoint(p) && Map.Get(p) === val) {
            return p;
        }
        return null;
    };

    /**
     * @return {null}
     */
    Map.GetRight = function (point, val) {
        var p = point.GetRight();
        if (Map.HasPoint(p) && Map.Get(p) === val) {
            return p;
        }
        return null;
    };

    Map.GetNear = function (point, val) {
        var point_list = [];
        var up = Map.GetUp(point, val);
        if (up) {
            point_list.push(up);
        }
        var down = Map.GetDown(point, val);
        if (down) {
            point_list.push(down);
        }
        var left = Map.GetLeft(point, val);
        if (left) {
            point_list.push(left);
        }
        var right = Map.GetRight(point, val);
        if (right) {
            point_list.push(right);
        }
        return point_list;
    };

    Map.SearchAround = function (point, val, pointset) {
        var near_list = Map.GetNear(point, val);
        var new_list = pointset.AddList(near_list);
        for (var i = 0; i < new_list.length; i++) {
            Map.SearchAround(new_list[i], val, pointset);
        }
    };

    Map.GetAround = function (point, val) {
        var pointset = WeiqiPointSet();
        if (Map.Get(point) === val) {
            pointset.Add(point);
            Map.SearchAround(point, val, pointset);
        }
        return  pointset;
    };

    Map.GetLives = function (pointset) {
        var lives = WeiqiPointSet();
        for (var i = 0; i < pointset.Length(); i++) {
            var points = Map.GetNear(pointset.Get(i), WEIQI_LIFE);
            if (points.length > 0)
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

//玩家控制器。
//参数必选。
function WeiqiPlayer(number) {
    var Player = {};

    var Number = number;
    var Val = 1;

    Player.GetNumber = function () {
        return Number;
    };
    Player.Get = function () {
        return Val;
    };
    Player.Set = function (val) {
        Val = val;
    };
    Player.Next = function () {
        Val ++;
        if (Val > Number) {
            Val = 1;
        }
    };
    Player.OtherList = function () {
        var list = [];
        for ( var i = 1 ; i <= Number; i++) {
            if ( i === Val) {
                continue;
            }
            list.push(i);
        }
        return list;
    };
    Player.Copy = function () {
        var player = WeiqiPlayer(Number);
        player.Set(Player.Get());
        return player;
    };

    return Player;
};

//创建一步棋。
//MAP 必须。
//POINT 可选，无值则PASS一手。
//PLAYER 可选，无值则PASS一手。
/**
 * @return {null}
 */

 
function WeiqiMove(map, point, player, number) {
    var Move = {};

    var Map = map;
    var Point = point;
    var Player = player;
    var Number = number;

    var Nexts = [];

    Move.Map = function() {
        return Map;
    };
    Move.Point = function() {
        return Point;
    };
    Move.Player = function() {
        return Player;
    };
    Move.Number = function() {
        return Number
    };
    Move.Nexts = function() {
        return Nexts;
    };
    Move.HasNexts = function() {
        return Nexts.length > 0;
    };

    Move.AddNext = function(move) {
        Nexts.push(move);
    }
    Move.DelNext = function(i) {
        Nexts.splice(i, 1);
    }
    Move.SetNext = function(i, move) {
        Nexts[i] = move;
    }
    Move.GetNext = function(i) {
        if (Nexts.length === 0 ) return null;
        if (!i) return Nexts[0];
        return Nexts[i];
    }

    
    if (!Map) {
        return null;
    }
    if (Point && Point.Bool() && Map.HasPoint(Point)) {
        if (Map.HasPlayer(Point)) {
            return null;
        }
        Map.Set(Point, Player.Get());

        var other_player_list = Player.OtherList();
        console.log(other_player_list);
        var eat_count = 0;
        for( var i = 0; i<other_player_list; i++) {
            
            var other_player = other_player_list[i];
            var eat_number = 0;

            var up = Point.GetUp();
            if (Map.HasPoint(up)) {
                var other_up = Map.GetAround(up, other_player);
                console.log(other_up.Str());
                var other_up_lives = Map.GetLives(other_up);
                console.log(other_up_lives.Str());
                if (other_up_lives.Length() === 0) {
                    eat_number += Map.ClearSet(other_up);
                }
            }

            var down = Point.GetDown();
            if (Map.HasPoint(down)) {
                var other_down = Map.GetAround(down, other_player);
                var other_down_lives = Map.GetLives(other_down);
                if (other_down_lives.Length() === 0) {
                    eat_number += Map.ClearSet(other_down);
                }
            }

            var left = Point.GetLeft();
            if (Map.HasPoint(left)) {
                var other_left = Map.GetAround(left, other_player);
                var other_left_lives = Map.GetLives(other_left);
                if (other_left_lives.Length() === 0) {
                    eat_number += Map.ClearSet(other_left);
                }
            }

            var right = Point.GetRight();
            if (Map.HasPoint(right)) {
                var other_right = Map.GetAround(right, other_player);
                var other_right_lives = Map.GetLives(other_right);
                if (other_right_lives.Length() === 0) {
                    eat_number += Map.ClearSet(other_right);
                }
            }
            eat_count += eat_number;
        }
        var mypointset = Map.GetAround(Point, Player.Get());
        var mypointlives = Map.GetLives(mypointset);

        if (eat_count > 0) {

        } else {
            if (mypointlives.Length() === 0) {
                return null;
            }
        }
    }


    return Move;
}

function WeiqiTree(root) {
    var Tree = {};

    var Root = root;



    return Tree;
};


//围棋驱动。
//map 可选，默认为19大小的空图。
//player_number 可选，默认为两个玩家。
//返回一个对象，给交互层。
function WeiqiDrive(start_map, player_number) {
    var Drive = {};

    //默认值，19大小的空图和两个玩家。
    if (!start_map) {
        start_map = WeiqiMap(WEIQI_DEFAULT_SIZE);
    }
    if (isNaN(player_number) || player_number < WEIQI_MIN_PLAYER_NUMBER) {
        player_number = WEIQI_MIN_PLAYER_NUMBER;
    }

    var Player = WeiqiPlayer(player_number);
    var BranchList = [];
    var BranchPtr = 0;
    var MovePtr = 0;

    //初始化。
    var master = WeiqiMoveTree();
    master.Add(WeiqiMove(start_map, null, null));
    BranchList.push(master);

    //落子
    //返回成功还是失败。
    Drive.Move = function (point) {
        var map = BranchList[BranchPtr].Get(MovePtr).GetMap().Copy();
        var player = Player.Copy();
        var move = WeiqiMove(map, point, player);
        if (move) {
            var lastmove = BranchList[BranchPtr].Get(0 - Player.GetNumber());
            if (lastmove) {
                var lastmap = lastmove.GetMap();
                if (lastmap.Equals(move.GetMap())) {
                    return false;
                }
            }
            BranchList[BranchPtr].Add(move);
            MovePtr ++;
            Player.Next();
            return true;
        }
        return false;
    };

    //获取指定一步棋。
    Drive.GetMove = function (number) {
        if (!number || isNaN(number)) {
            return BranchList[BranchPtr].Get(MovePtr);
        }
        return BranchList[BranchPtr].Get(number);
    };

    //悔棋，删除几步棋。
    //返回成功还是失败。
    Drive.DeleteMove = function (number) { };

    //结束
    Drive.Finish = function () { };

    //输出棋谱
    //返回字符串。
    Drive.ToSgf = function () { };

    //分支代码
    Drive.AddBranch = function () { };
    Drive.DelBranch = function () { };



    return Drive;
}

//先设置背景图片和棋子图片。
//然后Load就可以了。
//棋盘状态改变后，按图刷新即可。
function WeiqiCanvas(canvasid) {
    var Mark = 0;
    var Black = 1;
    var White = 2;

    var TagY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"];
    var TagX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    var Weiqi = {};
    var Canvas = document.getElementById(canvasid);
    var CanvasContext = Canvas.getContext('2d');

    //背景
    var BackgroundImageSrcLise = [];
    var BackgroundImageList = [];
    var BackgroundImageIndex = 0;
    //添加背景图片
    Weiqi.AddBackgroundImageSrcList = function(src_list) {
        if (Object.prototype.toString.call(src_list)!=='[object Array]') {
            BackgroundImageSrcLise = [];
        }
        for ( var i = 0 ; i < src_list.length; i ++ ) {
            if (src_list[i]) {
                BackgroundImageSrcLise.push( src_list[i]);
            }
        }
    };
    //选用背景图片.
    Weiqi.SetBackgroundImage = function(i) {
        BackgroundImageIndex = i;
    };
    //绘画背景图片.
    Weiqi.DrawBackgroundImage = function () {
        if (BackgroundImageIndex < BackgroundImageList.length && BackgroundImageIndex >= 0)
            CanvasContext.drawImage(BackgroundImageList[BackgroundImageIndex], 0, 0, CanvasSize, CanvasSize);
    };

    //棋盘
    var CellSize = 25;
    var Lines = 19;
    var BoardSize = CellSize*(Lines-1);
    var BoardMargin = CellSize*1.5;
    var BoardStartXY = BoardMargin - CellSize/2;
    var CanvasSize = CellSize*(Lines+2);
    Canvas.width = CanvasSize;
    Canvas.height = CanvasSize;
    Weiqi.SetChessBoardSize = function (cell_size, line_number) {
        if (cell_size) {
            if (cell_size < 10 ) {
                cell_size = 10;
            }
        }
        CellSize = cell_size;
        if (line_number) {
            if (line_number > TagY.length ) {
                line_number = TagY.length;
            } else if (line_number < 9 ) {
                line_number = 9;
            }
        }
        Lines = line_number;
        BoardSize = CellSize*(Lines-1);
        BoardMargin = CellSize*1.5;
        BoardStartXY = BoardMargin - CellSize/2;
        CanvasSize = CellSize*(Lines+2);
        Canvas.width = CanvasSize;
        Canvas.height = CanvasSize;
    };

    //绘制棋盘
    Weiqi.DrawChessBoard = function () {
        CanvasContext.beginPath();
        //画边框。
        CanvasContext.lineWidth = 2;
        CanvasContext.strokeStyle = '#000';
        CanvasContext.rect(BoardMargin, BoardMargin, BoardSize, BoardSize);
        CanvasContext.stroke();

        //画棋格。
        CanvasContext.lineWidth = 1;
        for ( var i = 1; i<Lines-1; i++ ) {
            CanvasContext.moveTo(CellSize*i+BoardMargin, BoardMargin);
            CanvasContext.lineTo(CellSize*i+BoardMargin, BoardMargin+BoardSize);

            CanvasContext.moveTo(BoardMargin, BoardMargin+CellSize*i);
            CanvasContext.lineTo(BoardMargin+BoardSize, BoardMargin+CellSize*i);
        }
        CanvasContext.stroke();

        //画星位。
        CanvasContext.fillStyle = '#000';
        var arcR = CellSize/8;
        if (Lines === 19) {
            CanvasContext.beginPath();
            CanvasContext.arc(BoardMargin+CellSize*3, BoardMargin+CellSize*3, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*9, BoardMargin+CellSize*3, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*15, BoardMargin+CellSize*3, arcR, 0, 2*Math.PI);
            CanvasContext.fill();
            CanvasContext.beginPath();
            CanvasContext.arc(BoardMargin+CellSize*3, BoardMargin+CellSize*9, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*9, BoardMargin+CellSize*9, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*15, BoardMargin+CellSize*9, arcR, 0, 2*Math.PI);
            CanvasContext.fill();
            CanvasContext.beginPath();
            CanvasContext.arc(BoardMargin+CellSize*3, BoardMargin+CellSize*15, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*9, BoardMargin+CellSize*15, arcR, 0, 2*Math.PI);
            CanvasContext.arc(BoardMargin+CellSize*15, BoardMargin+CellSize*15, arcR, 0, 2*Math.PI);
            CanvasContext.fill();
        }

        //画坐标。
        var fontsize = CellSize*3/4;
        CanvasContext.font= fontsize.toString()+"px Asia";
        CanvasContext.textAlign = 'center';
        for (var j=0; j<Lines; j++) {
            CanvasContext.fillText(TagX[j], BoardMargin+j*CellSize, BoardMargin-CellSize*3/4);
            CanvasContext.fillText(TagX[j], BoardMargin+j*CellSize, BoardMargin+BoardSize+CellSize*5/4);
            CanvasContext.fillText(TagY[j], BoardMargin-CellSize, BoardMargin+j*CellSize+CellSize/4);
            CanvasContext.fillText(TagY[j], BoardMargin+CellSize+BoardSize, BoardMargin+j*CellSize+CellSize/4);
        }
        CanvasContext.closePath();
    };

    //下棋事件在这里设置。
    Weiqi.OnMove = null;
    Canvas.onclick = function (e) {
        var x = Math.floor((e.clientX-Canvas.getBoundingClientRect().left-BoardStartXY)/CellSize);
        var y = Math.floor((e.clientY-Canvas.getBoundingClientRect().top-BoardStartXY)/CellSize);
        if (x >= 0 && x < Lines && y >= 0 && y < Lines){
            if (Weiqi.OnMove) {
                Weiqi.OnMove(x, y);
            } else {
                Weiqi.DrawChessPiece(x, y, Black);
            }
        }
    };

    //棋子.
    var ImageSrcList = [];
    var ImageList = [];
    //设置棋子图片。
    Weiqi.SetChessPieceImageSrc = function(black_src, white_src) {
        ImageSrcList[Black] = black_src;
        ImageSrcList[White] = white_src;
    };
    /**
     * @return {boolean}
     */
    //绘制棋子。
    Weiqi.DrawChessPiece = function (x, y, player) {
        if (isNaN(x) || isNaN(y) || isNaN(player) ) {
            return false;
        }
        if (x < 0 || y < 0 || player <= 0 ) {
            return false;
        }
        if (x > 25 || y > 25 ) {
            return false;
        }
        CanvasContext.drawImage(ImageList[player],
            x * CellSize + BoardStartXY,
            y * CellSize + BoardStartXY,
            CellSize-1,
            CellSize-1);
        return true;
    };
    //按图绘制。
    Weiqi.DrawChessPieceMany = function(map) {
        if (map){
            for (var x = 0 ; x < Lines; x ++ ) {
                for (var y = 0 ; y < Lines; y ++ ){
                    if (map[x][y].player )
                        Weiqi.DrawChessPiece(map[x][y].player, x, y);
                }
            }
        }
    };

    //加载资源/初始化..
    Weiqi.Load = function (callback) {
        var n = BackgroundImageSrcLise.length + 2;

        for ( var i=0; i<BackgroundImageSrcLise.length; i++) {
            var img = new Image();
            img.src = BackgroundImageSrcLise[i];
            BackgroundImageList.push(img);
            BackgroundImageList[i].onload = function () {
                n--;
                console.log('正在载入图片...剩余', n);
                if (!n) {
                    if (callback) {
                        callback();
                    } else {
                        Weiqi.Draw();
                    }
                }
            };
        }
        var b_img = new Image();
        b_img.src = ImageSrcList[Black];
        ImageList[Black] = b_img;
        b_img.onload = function () {
            n--;
            console.log('正在载入图片...剩余', n);
            if (!n) {
                if (callback) {
                    callback();
                } else {
                    Weiqi.Draw();
                }
            }
        };
        var w_img = new Image();
        w_img.src = ImageSrcList[White];
        ImageList[White] = w_img;
        w_img.onload = function () {
            n--;
            console.log('正在载入图片...剩余', n);
            if (!n) {
                if (callback) {
                    callback();
                } else {
                    Weiqi.Draw();
                }
            }
        };
    };
    //绘制背景和棋盘。
    Weiqi.Draw = function () {
        Weiqi.DrawBackgroundImage();
        Weiqi.DrawChessBoard();
    };
    //按图绘制全部。
    Weiqi.Refresh = function (map) {
        Weiqi.Draw();
        Weiqi.DrawChessPieceMany(map);
    };

    return Weiqi;
}

