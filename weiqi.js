function AppWeiqi (){

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.Str = function(){
        return '['+this.x+','+this.y+']';
    }
    Point.prototype.Bool = function() {
        return !isNaN(this.x) && !isNaN(this.y);
    }
    Point.prototype.Clone = function() {
        return new Point(this.x, this.y);
    }
    Point.prototype.Equals = function(p) {
        return p.x === this.x && p.y === this.y;
    }
    Point.prototype.Clear = function() {
        this.x = null;
        this.y = null;
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
    Point.prototype.GetNears = function() {
        return [this.GetUp(), this.GetDown(), this.GetLeft(), this.GetRight()];
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
    PointSet.prototype.Has = function(p) {
        for( var i = 0; i<this.set.length; i++) {
            if (this.set[i].Equals(p)) {
                return true;
            }
        }
        return false;
    }
    PointSet.prototype.Equals = function(pset) {
        if( pset instanceof PointSet) {
            if (pset.set.length === this.set.length) {
                for(var i = 0; i< pset.set.length; i++) {
                    if( !this.Has(pset.set[i])) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    PointSet.prototype.Length = function(){
        return this.set.length;
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
    PointSet.prototype.Del = function(i) {
        this.set.splice(i, 1);
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
    PointSet.prototype.Set = function(i, p) {
        this.set[i] = p;
    }
    PointSet.prototype.Get = function(i) {
        return this.set[i];
    }
    PointSet.prototype.Find = function(p) {
        for(var i = 0; i < this.set.length; i++) {
            if (this.set[i].Equals(p)) {
                return i;
            }
        }
        return null;
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
    Cell.prototype.Clone = function() {
        return new Cell(this.player, this.number);
    }
    Cell.prototype.Equals = function(c) {
        return c.player === this.player && c.number === this.number;
    }
    Cell.prototype.Clear = function() {
        this.player = 0;
        this.number = 0;
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
    CellMap.prototype.Equals = function(cellmap) {
        if(this.size != cellmap.size) {
            return false;
        }
        for( var x = 0; x < this.size; x++) {
            for( var y = 0; y < this.size; y++ ) {
                if( this.data[x][y] != cellmap.data[x][y]) {
                    return false;
                }
            }
        }
        return true;
    }
    CellMap.prototype.HasPoint = function(p) {
        if( p.x < this.size && p.y < this.size && p.x>=0 && p.y>=0) {
            return true;
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
    CellMap.prototype.Get = function(p) {
        return  this.data[p.x][p.y];
    }
    CellMap.prototype.Clear = function() {
        for( var x = 0; x< this.size; x++) {
            for( var y = 0; y< this.size; y++) {
                this.data[x][y].Clear();
            }
        }
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

    function Move(count, player, point, cellmap) {
        this.count = count;
        this.player = player;
        this.point = point;
        this.cellmap = cellmap;
    }

    function PlayerController(player_max) {
        this.max = player_max;
        this.current = 1;
        this.count = 1;
    }
    PlayerController.prototype.Next = function() {
        this.current++;
        this.count++;
        if (this.current > this.max) {
            this.current = 1;
        }
    }
    PlayerController.prototype.Value = function() {
        return this.current;
    }
    PlayerController.prototype.OtherList = function() {
        var other = [];
        for( var i = 1; i <= this.max; i++) {
            if (i != this.current) other.push(i);
        }
        return other;
    }

    var GetUpPointByPlayer = function(player, point, cellmap) {
        var p = point.GetUp();
        if( p.Bool() && cellmap.HasPoint(p) && (cellmap.Get(p).player === player)) {
            return p;
        }
        return null;
    }
    var GetDownPointByPlayer = function(player, point, cellmap) {
        var p = point.GetDown();
        if( p.Bool() && cellmap.HasPoint(p) && (cellmap.Get(p).player === player)) {
            return p;
        }
        return null;
    }
    var GetLeftPointByPlayer = function(player, point, cellmap) {
        var p = point.GetLeft();
        if( p.Bool() && cellmap.HasPoint(p) && (cellmap.Get(p).player === player)) {
            return p;
        }
        return null;
    }
    var GetRightPointByPlayer = function(player, point, cellmap) {
        var p = point.GetRight();
        if( p.Bool() && cellmap.HasPoint(p) && (cellmap.Get(p).player === player)) {
            return p;
        }
        return null;
    }
    var GetNearPointListByPlayer = function(player, point, cellmap) {
        var near = [];
        var up = GetUpPointByPlayer(player, point, cellmap) ;
        if (up){
            near.push(up);
        }
        var down = GetDownPointByPlayer(player, point, cellmap);
        if( down ) {
            near.push(down);
        }
        var left = GetLeftPointByPlayer(player, point, cellmap);
        if( left) {
            near.push(left);
        }
        var right = GetRightPointByPlayer(player, point, cellmap);
        if( right) {
            near.push(right);
        }
        return near;
    }
    var SearchAroundByPlayer = function(player, point, cellmap, point_set) {
        var near = GetNearPointListByPlayer(player, point, cellmap);
        var news = point_set.AddList(near);
        for( var i = 0; i< news.length; i++) {
            SearchAroundByPlayer(player, news[i], cellmap, point_set);
        }
    }
    var GetAroundByPlayer = function(player, point, cellmap) {
        var pointset = new PointSet();
        if( cellmap.Get(point).player === player) {
            pointset.Add(point);
            SearchAroundByPlayer(player, point, cellmap, pointset);
        }
        return pointset;
    }
    var LifeCount = function(pointset, cellmap) {
        var lives = new PointSet();
        for( var i = 0; i < pointset.Length(); i++) {
            var points = GetNearPointListByPlayer(0, pointset.Get(i), cellmap);
            if( points.length>0) {
                lives.AddList(points);
            }
        }
        return lives;
    }
    PlayerController.prototype.Move = function(point, cellmap) {
        if( point.Bool() && cellmap.HasPoint(point) && !cellmap.HasPlayer(point)) {
            cellmap.SetCellByPoint(point, new Cell(this.current, this.count)) ;

            var other_player_list = this.OtherList();
            var clear_count = 0;
            for( var i = 0; i < other_player_list.length; i++) {
                var other_player = other_player_list[i];
                var clear = 0;
                
                var p_list = point.GetNears();
                for( var j = 0; j < p_list.length; j++) {
                    var p = p_list[j];
                    if( cellmap.HasPoint(p) && (cellmap.Get(p).player === other_player)) {
                        var p_set = GetAroundByPlayer(other_player, p, cellmap);
                        var p_lives = LifeCount(p_set, cellmap);
                        if( p_lives.Length()===0)
                            clear += cellmap.ClearByPointSet(p_set);
                    }
                }
                clear_count += clear;
            }
            if(clear_count === 0 ) {
                var point_set = GetAroundByPlayer(this.current, point, cellmap);
                var point_set_lives = LifeCount( point_set, cellmap);
                if( point_set_lives.Length() === 0){
                    return null;
                }
            }
            return new Move(this.count, this.current, point, cellmap);
        }
        return null;
    }

    function CreateGame() {
        var Game = {};

        var Players = new PlayerController(2);


        return Game;
    }


    //先设置背景图片和棋子图片。
    //然后Load就可以了。
    //棋盘状态改变后，按图刷新即可。
    function CreateChessBoard(canvas) {
        if( !canvas) return null;
        var Mark = 0;
        var Black = 1;
        var White = 2;

        var TagY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26"];
        var TagX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        var Weiqi = {};
        var Canvas = canvas;
        var CanvasContext = Canvas.getContext('2d');

        //背景
        var BackgroundImageSrcList = [];
        var BackgroundImageList = [];
        var BackgroundImageIndex = 0;
        //添加背景图片
        Weiqi.SetBackgroundImageSrcList = function(image_list) {
            BackgroundImageSrcList = [];
            for(var i = 0; i < image_list.length; i++) {
                BackgroundImageSrcList.push(image_list[i]);
            }

        }
        Weiqi.AddBackgroundImageSrcList = function() {
            BackgroundImageSrcList = BackgroundImageSrcList.concat(arguments);
        };
        Weiqi.LoadBackgroundImageList = function(callback) {
            BackgroundImageList = [];
            var n = BackgroundImageSrcList.length;
            for( var i = 0; i < BackgroundImageSrcList.length; i++) {
                var img = new Image();
                img.src = BackgroundImageSrcList[i];
                BackgroundImageList[i] = img;
                BackgroundImageList[i].onload = function() {
                    n--;
                    console.log('载入背景图片。。。剩余'+n);
                    if( !n) {
                        console.log('背景图片载入完成。');
                        if( callback) {
                            callback();
                        }
                    }
                }
            }
            return BackgroundImageList.length;
        }
        //选用背景图片.
        Weiqi.SetBackgroundImageIndex = function(i) {
            BackgroundImageIndex = i;
        };
        //绘画背景图片.
        Weiqi.DrawBackgroundImage = function () {
            if (BackgroundImageIndex < BackgroundImageList.length && BackgroundImageIndex >= 0)
                CanvasContext.drawImage(BackgroundImageList[BackgroundImageIndex], 0, 0, CanvasSize, CanvasSize);
        };

        //棋盘
        var DisplaySize = 25;
        var GameSize = 19;
        var BoardSize = DisplaySize*(GameSize-1);
        var BoardMargin = DisplaySize*1.5;
        var BoardStartXY = BoardMargin - DisplaySize/2;
        var CanvasSize = DisplaySize*(GameSize+2);
        Canvas.width = CanvasSize;
        Canvas.height = CanvasSize;
        //设置显示基数
        Weiqi.SetDisplaySize = function(display_size) {
            if( !isNaN(display_size) && display_size) {
                if( display_size < 10 ) {
                    display_size = 10;
                }
            } else {
                return null;
            }
            DisplaySize = display_size;
            BoardSize = DisplaySize*(GameSize-1);
            BoardMargin = DisplaySize*1.5;
            BoardStartXY = BoardMargin - DisplaySize/2;
            CanvasSize = DisplaySize*(GameSize+2);
            Canvas.width = CanvasSize;
            Canvas.height = CanvasSize;
        }
        //设置游戏大小。
        Weiqi.SetGameSize = function(game_size) {
            if(!isNaN(game_size)) {
                if( game_size > TagX.length) {
                    game_size = TagX.length;
                } else if( game_size < 9) {
                    game_size = 9;
                }
            } else {
                return null; 
            }
            GameSize = game_size;
            BoardSize = DisplaySize*(GameSize-1);
            BoardMargin = DisplaySize*1.5;
            BoardStartXY = BoardMargin - DisplaySize/2;
            CanvasSize = DisplaySize*(GameSize+2);
            Canvas.width = CanvasSize;
            Canvas.height = CanvasSize;
        }

        //绘制棋盘
        Weiqi.DrawChessBoard = function () {
            console.log('绘制棋盘');
            CanvasContext.beginPath();
            //画边框。
            CanvasContext.lineWidth = 2;
            CanvasContext.strokeStyle = '#000';
            CanvasContext.rect(BoardMargin, BoardMargin, BoardSize, BoardSize);
            CanvasContext.stroke();

            //画棋格。
            CanvasContext.lineWidth = 1;
            for ( var i = 1; i<GameSize-1; i++ ) {
                CanvasContext.moveTo(DisplaySize*i+BoardMargin, BoardMargin);
                CanvasContext.lineTo(DisplaySize*i+BoardMargin, BoardMargin+BoardSize);

                CanvasContext.moveTo(BoardMargin, BoardMargin+DisplaySize*i);
                CanvasContext.lineTo(BoardMargin+BoardSize, BoardMargin+DisplaySize*i);
            }
            CanvasContext.stroke();

            //画星位。
            CanvasContext.fillStyle = '#000';
            var arcR = DisplaySize/8;
            if (GameSize === 19) {
                CanvasContext.beginPath();
                CanvasContext.arc(BoardMargin+DisplaySize*3, BoardMargin+DisplaySize*3, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*9, BoardMargin+DisplaySize*3, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*15, BoardMargin+DisplaySize*3, arcR, 0, 2*Math.PI);
                CanvasContext.fill();
                CanvasContext.beginPath();
                CanvasContext.arc(BoardMargin+DisplaySize*3, BoardMargin+DisplaySize*9, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*9, BoardMargin+DisplaySize*9, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*15, BoardMargin+DisplaySize*9, arcR, 0, 2*Math.PI);
                CanvasContext.fill();
                CanvasContext.beginPath();
                CanvasContext.arc(BoardMargin+DisplaySize*3, BoardMargin+DisplaySize*15, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*9, BoardMargin+DisplaySize*15, arcR, 0, 2*Math.PI);
                CanvasContext.arc(BoardMargin+DisplaySize*15, BoardMargin+DisplaySize*15, arcR, 0, 2*Math.PI);
                CanvasContext.fill();
            }

            //画坐标。
            var fontsize = DisplaySize*3/4;
            CanvasContext.font= fontsize.toString()+"px Asia";
            CanvasContext.textAlign = 'center';
            for (var j=0; j<GameSize; j++) {
                CanvasContext.fillText(TagX[j], BoardMargin+j*DisplaySize, BoardMargin-DisplaySize*3/4);
                CanvasContext.fillText(TagX[j], BoardMargin+j*DisplaySize, BoardMargin+BoardSize+DisplaySize*5/4);
                CanvasContext.fillText(TagY[j], BoardMargin-DisplaySize, BoardMargin+j*DisplaySize+DisplaySize/4);
                CanvasContext.fillText(TagY[j], BoardMargin+DisplaySize+BoardSize, BoardMargin+j*DisplaySize+DisplaySize/4);
            }
            CanvasContext.closePath();
        };

        //下棋事件在这里设置。
        Weiqi.OnMove = null;
        Canvas.onclick = function (e) {
            var x = Math.floor((e.clientX-Canvas.getBoundingClientRect().left-BoardStartXY)/DisplaySize);
            var y = Math.floor((e.clientY-Canvas.getBoundingClientRect().top-BoardStartXY)/DisplaySize);
            if (x >= 0 && x < GameSize && y >= 0 && y < GameSize){
                if (Weiqi.OnMove) {
                    Weiqi.OnMove(x, y);
                } else {
                    Weiqi.DrawChessPiece(x, y, Black);
                }
            }
        };

        //棋子.
        var PlayerImageSrcList = [];
        var PlayerImageList = [];
        //设置棋子图片。
        Weiqi.SetPlayerImageSrcList = function(playerimagesrclist) {
            PlayerImageSrcList = [];
            PlayerImageSrcList.push('');
            for(var i = 0; i < playerimagesrclist.length; i ++) {
                PlayerImageSrcList.push(playerimagesrclist[i]);
            }            
        };
        Weiqi.LoadPlayerImageList = function(callback) {
            PlayerImageList = [];
            var n = PlayerImageSrcList.length - 1;
            for( var i = 1; i < PlayerImageSrcList.length; i++) {
                var img = new Image();
                img.src = PlayerImageSrcList[i];
                PlayerImageList[i] = img;
                PlayerImageList[i].onload = function() {
                    n--;
                    console.log('载入棋子图片。。。剩余'+n);
                    if( !n ) {
                        console.log('棋子图片载入完成。');
                        if( callback) {
                            callback();
                        } 
                    }
                }
            }
            return PlayerImageList.length;
        }
        /**
         * @return {boolean}
         */
        //绘制棋子。
        Weiqi.DrawChessPiece = function (x, y, player) {
            if (isNaN(x) || isNaN(y) || isNaN(player) ) {
                return false;
            }
            if (x < 0 || y < 0 || player < 0 ) {
                return false;
            }
            if (x > 25 || y > 25 ) {
                return false;
            }
            //画棋子
            CanvasContext.drawImage(PlayerImageList[player],
                x * DisplaySize + BoardStartXY,
                y * DisplaySize + BoardStartXY,
                DisplaySize-1,
                DisplaySize-1);
            return true;
        };
        //按图绘制。
        Weiqi.DrawChessPieceByMap = function(map) {
            if (map){
                for (var x = 0 ; x < GameSize; x ++ ) {
                    for (var y = 0 ; y < GameSize; y ++ ){
                        if (map[x][y].player )
                            Weiqi.DrawChessPiece(x, y, map[x][y].player);
                    }
                }
            }
        };

        //加载资源/初始化..
        Weiqi.Load = function (callback) {
            var n = 0;
            n = Weiqi.LoadBackgroundImageList(Weiqi.Draw);
            Weiqi.LoadPlayerImageList();
            if( !n ) {
                if (callback) callback();
                else Weiqi.Draw();
            }
        };
        //绘制背景和棋盘。
        Weiqi.Draw = function () {
            //画背景
            Weiqi.DrawBackgroundImage();
            //画棋盘
            Weiqi.DrawChessBoard();
        };
        //按图绘制全部。
        Weiqi.DrawByMap = function (map) {
            Weiqi.Draw();
            Weiqi.DrawChessPieceByMap(map);
        };

        return Weiqi;
    }


/****************************************
 * 
 */

    //显示容器句柄
    var Display = null;
    //画棋盘句柄
    var Canvas = null;
    //棋盘显示控制句柄
    var ChessBoard = null;

    //显示ID
    this.DisplayId = 'weiqi';
    this.ApplyDisplayId = function() {

    }
    //显示尺寸基数设置
    this.DisplaySize = 25;
    this.ApplyDisplaySize = function() {
        ChessBoard.SetDisplaySize(this.DisplaySize);
        ChessBoard.Draw();
    }

    //背景设置
    this.ChessBoardBackgroundImage = ['bg1.png', 'bg2.png', 'bg3.png'];
    this.ApplyChessBoardBackgroundImage = function( ) {
        ChessBoard.SetBackgroundImageSrcList(this.ChessBoardBackgroundImage);
        ChessBoard.LoadBackgroundImageList(ChessBoard.Draw);
    }

    //背景选择
    this.ChessBoardBackgroundImageIndex = 0;
    this.ApplyChessBoardBackgroundImageIndex = function( ){
        ChessBoard.SetBackgroundImageIndex(this.ChessBoardBackgroundImageIndex);
        ChessBoard.Draw();
    }

    //棋子样式设置
    this.ChessPieceImage = ['b.png', 'w.png'];
    this.ApplyChessPieceImage = function() {

    }
    
    //游戏玩家设置
    this.GamePlayer = 2;
    this.ApplyGamePlayer = function() {

    }

    //游戏大小设置
    this.GameSize = 19;
    this.ApplyGameSize = function() {
        ChessBoard.SetGameSize(this.GameSize);
        ChessBoard.Draw();
    }

    //棋谱设置
    this.GameSgf = '';
    this.ApplyGameSgf = function() {

    }

    //初始化
    this.Init = function() {
        Display = document.getElementById(this.DisplayId);
        Canvas = document.createElement('canvas');
        Display.appendChild(Canvas);
        ChessBoard = CreateChessBoard(Canvas);

        ChessBoard.SetBackgroundImageSrcList(this.ChessBoardBackgroundImage);
        ChessBoard.SetPlayerImageSrcList(this.ChessPieceImage);
        ChessBoard.Load();
    }
    
}
