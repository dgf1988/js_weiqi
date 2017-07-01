
/**
 * Created by dgf19 on 2015/10/23.
 *  围棋核心API
 *
 */

var WEIQI_NULL = -1;
var WEIQI_NULL_POINT = -1;
var WEIQI_NULL_PLAYER = -1;
var WEIQI_NULL_NUMBER = -1;
var WEIQI_ZERO = 0;
var WEIQI_NO_PLAYER = 0;
var WEIQI_BLACK_PLAYER = 1;
var WEIQI_WHITE_PLAYER = 2;
var WEIQI_MIN_SIZE = 9;
var WEIQI_DEFAULT_SIZE = 19;
var WEIQI_MAX_SIZE = 26;

function WeiqiCore(size, start_map, start_Player) {
    var Weiqi = {};

    if (size > WEIQI_MAX_SIZE) size = WEIQI_MAX_SIZE;
    if (size < WEIQI_MIN_SIZE) size = WEIQI_MIN_SIZE;
    var Size = size;
    Weiqi.GetSize = function () {
        return Size;
    };

    var Zero = 0;
    var Black = 1;
    var White = 2;
    var StartPlayer = start_Player < 3 && start_Player > 0 ? start_Player : Black;

    var CreateMap = function (size) {
        if (size < 9 || size > 26) return null;
        var map = [];
        for ( var x = 0 ; x < size ; x ++ ) {
            var line = [];
            map.push(line);
            for (var y = 0; y < size; y ++ ) {
                map[x].push({Player: 0, Number: 0});
            }
        }
        return map;
    };
    var StartMap = start_map ? start_map : CreateMap(Size);

    /**
     * @return {boolean}
     */
    Weiqi.Move = function (x, y) {

        return false;
    };

    return Weiqi;
}

//新点计算。
function WeiqiPoint(x, y) {
    var Point = {};
    var X = WEIQI_NULL_POINT;
    var Y = WEIQI_NULL_POINT;

    if (!isNaN(x)) {
        if (x >=0 && x < WEIQI_MAX_SIZE) {
            X = x;
        }
    }

    if (!isNaN(y)) {
        if (y >=0 && y < WEIQI_MAX_SIZE) {
            Y = y;
        }
    }

    Point.Clear = function () {
        X = WEIQI_NULL_POINT;
        Y = WEIQI_NULL_POINT;
    };
    /**
     * @return {boolean}
     */
    Point.IsEmpty = function () {
        return X === WEIQI_NULL_POINT && Y === WEIQI_NULL_POINT;
    };

    Point.GetUp = function () {
        return WeiqiPoint(X-1, Y);
    };
    Point.GetDown = function () {
        return WeiqiPoint(X+1, Y);
    };
    Point.GetLeft = function () {
        return WeiqiPoint(X, Y-1);
    };
    Point.GetRight = function () {
        return WeiqiPoint(X, Y+1);
    };

    /**
     * @return {number}
     */
    Point.GetX = function () {
        return X;
    };
    /**
     * @return {number}
     */
    Point.GetY = function () {
        return Y;
    };

    /**
     * @return {boolean}
     */
    Point.Equals = function (point) {
        return X === point.GetX() && Y === point.GetY();
    };

    Point.Clone = function () {
        return WeiqiPoint(X, Y);
    };

    return Point;
}

function WeiqiPointSet() {
    var Set = {};
    var Data = [];

    /**
     * @return {boolean}
     */
    Set.Has = function (point) {
        for(var i = 0 ; i < Data.length; i++) {
            if (!Data[i].Equals(point)) {
                return false;
            }
        }
        return true;
    };

    /**
     * @return {boolean}
     */
    Set.Add = function (point) {
        if (Set.Has(point)) {
            return false;
        } else {
            Data.push(point);
            return true;
        }
    };

    /**
     * @return {number}
     */
    Set.AddMany = function (point_list) {
        var n = 0;
        for(var i = 0; i < point_list.length; i++) {
            if (Set.Add(point_list[i])) {
                n ++;
            }
        }
        return n;
    };

    Set.Length = function () {
        return Data.length;
    };

    /**
     * @return {boolean}
     */
    Set.Equals = function (point_set) {
        if (Data.length !== point_set.Length()) {
            return false;
        }
        for (var i = 0; i < Data.length; i ++) {
            if (!point_set.Has(Data[i])) {
                return false;
            }
        }
        return true;
    };

    return Set;
}

//新元计算。

function WeiqiCell(player, number) {
    var Cell = {};

    var Player = WEIQI_NO_PLAYER;
    if (!isNaN(player)) {
        if (player > WEIQI_NO_PLAYER ) {
            Player = player;
        }
    }

    var Number = WEIQI_NO_PLAYER;
    if (!isNaN(number)) {
        if (number > WEIQI_ZERO ) {
            Number = number;
        }
    }

    Cell.Clear = function () {
        Player = WEIQI_NO_PLAYER;
        Number = WEIQI_ZERO;
    };
    /**
     * @return {boolean}
     */
    Cell.IsEmpty = function () {
        return Player === WEIQI_NO_PLAYER && Number === WEIQI_ZERO;
    };

    Cell.SetPlayer = function (player) {
        Player = player;
    };
    Cell.SetNumber = function (number) {
        Number = number;
    };
    /**
     * @return {number}
     */
    Cell.GetPlayer = function () {
        return Player;
    };
    /**
     * @return {number}
     */
    Cell.GetNumber = function () {
        return Number;
    };
    /**
     * @return {boolean}
     */
    Cell.HasPlayer = function () {
        return Player > WEIQI_NO_PLAYER ;
    };
    /**
     * @return {boolean}
     */
    Cell.HasNumber = function () {
        return Number > WEIQI_ZERO ;
    };
    /**
     * @return {boolean}
     */
    Cell.Equals = function (cell) {
        return Player === cell.GetPlayer() && Number === cell.GetNumber();
    };
    /**
     * @return {boolean}
     */
    Cell.EqualsPlayer = function (cell) {
        return Player === cell.GetPlayer() ;
    };

    Cell.Clone = function () {
        return WeiqiCell(Player, Number);
    };

    return Cell;
}
function WeiqiMap(size) {
    var Map = {};

    var Size = WEIQI_DEFAULT_SIZE;
    if (!isNaN(size) && size >= WEIQI_MIN_SIZE && size <= WEIQI_MAX_SIZE) {
        Size = size;
    }
    /**
     * @return {number}
     */
    Map.GetSize = function () {
        return Size;
    };
    var Data = [];
    for (var x = 0; x < size; x++) {
        var line = [];
        for (var y = 0; y < size; y++) {
            var cell = WeiqiCell();
            line.push(cell)
        }
        Data.push(line)
    }

    /**
     * @return {boolean}
     */
    Map.HasPoint = function (point) {
        var x = point.GetX();
        var y = point.GetY();
        return x >= 0 && x < size && y >=0 && y < size;
    };

    Map.GetCell = function (point) {
        return Data[point.GetX()][point.GetY()];
    };

    Map.SetCell = function (point, cell) {
        if (!cell) {
            cell = WeiqiCell();
        }
        Data[point.GetX()][point.GetY()].SetPlayer(cell.GetPlayer());
        Data[point.GetX()][point.GetY()].SetNumber(cell.GetNumber());
    };

    /**
     * @return {boolean}
     */
    Map.Move = function (point, player) {
        console.log(point.GetX(), point.GetY());
        if (point.IsEmpty() || !Map.HasPoint(point) || (player !== WEIQI_BLACK_PLAYER && player !== WEIQI_WHITE_PLAYER))  {
            return false;
        }
        Map.SetCell(point, WeiqiCell(player));
        return true;
    };

    Map.Foreach = function (func) {
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                func(x, y);
            }
        }
    };

    Map.ForeachPoint = function (func) {
        Map.Foreach(function (x, y) {
            func(WeiqiPoint(x, y));
        });
    };

    Map.ForeachCell = function (func) {
        Map.ForeachPoint(function (point) {
            func(Map.GetCell(point));
        });
    };

    Map.ForeachPointCell = function (func) {
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var p = WeiqiPoint(x, y);
                func(p, Map.GetCell(p));
            }
        }
    };

    Map.Clear = function () {
        Map.ForeachCell(function (cell) {
            cell.Clear();
        });
    };

    Map.ClearCell = function (point) {
        Map.SetCell(point, WeiqiCell());
    };

    /**
     * @return {boolean}
     */
    Map.IsEmpty = function () {
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                if (!Map.GetCell(WeiqiPoint(x, y)).IsEmpty()) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * @return {boolean}
     */
    Map.Equals = function (map) {
        if (Size !== map.GetSize()) {
            return false;
        }
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                var p = WeiqiPoint(x, y);
                if (!Map.GetCell(p).Equals( map.GetCell(p))) {
                    return false;
                }
            }
        }
        return true;
    };

    Map.Clone = function () {
        var map = WeiqiMap(Size);
        Map.ForeachPoint(function (point) {
            map.SetCell(point, Map.GetCell(point))
        });
        return map;
    };


    return Map;
}


//棋手定义
var go_life = 0;
var go_black = 1;
var go_white = 2;

var go_blackName = 'black';
var go_whiteName = 'white';
var go_blackRank = '七段';
var go_whiteRank = '八段';

//source
var go_imgs = [];
go_imgs[go_black] = 'url("/static/weiqi/qizi_black.png")';
go_imgs[go_white] = 'url("/static/weiqi/qizi_white.png")';
var go_blackPng = 3;
var go_whitePng = 4;
var go_redPng = 5;
go_imgs[go_blackPng] = 'url("/static/weiqi/black.png")';
go_imgs[go_whitePng] = 'url("/static/weiqi/white.png")';
go_imgs[go_redPng] = 'url("/static/weiqi/red.png")';



//step number color
var go_textColor = [];
go_textColor[go_black] = '#ffffff';
go_textColor[go_white] = '#000000';


//点计算
function go_createPoint(x,y){
    var point = {x:-1,y:-1};
    if(x>=0){
        point.x = x;
    }
    if(y>=0){
        point.y = y;
    }
    return point;

}
function go_pointToString(point){
    return '('+point.x+','+point.y+')';
}
function go_clearPoint(point){
    point.x = -1;
    point.y = -1;
}
function go_isEmptyPoint(point){
    return point.x == -1 || point.y == -1;
}
function go_equalPoint(srcPoint,desPoint){
    return srcPoint.x == desPoint.x && srcPoint.y == desPoint.y;
}
function go_copyPoint(point,desPoint){
    desPoint.x = point.x;
    desPoint.y = point.y;
}


function go_getUpPoint(point){
    return go_createPoint(point.x,point.y-1);
}
function go_getDownPoint(point){
    return go_createPoint(point.x,point.y+1);
}
function go_getLeftPoint(point){
    return go_createPoint(point.x-1,point.y);
}
function go_getRightPoint(point){
    return go_createPoint(point.x+1,point.y);
}

//元计算
function go_createCell(player,step){
    var cell = {
        player:0,
        step:0
    };
    if(player>0){
        cell.player = player;
    }
    if(step>0){
        cell.step = step;
    }
    return cell;
}
function go_cellToString(cell){
    return '['+cell.player+','+cell.step+']';
}
function go_clearCell(cell){
    cell.player = 0;
    cell.step = 0;
}
function go_isEmptyCell(cell){
    return cell.player == 0 && cell.step == 0 ;
}
function go_equalCell(srcCell,desCell){
    return srcCell.player == desCell.player && srcCell.step == desCell.step;
}
function go_equalCellPlayer(srcCell,desCell){
    return srcCell.player == desCell.player;
}
function go_copyCell(cell,desCell){
    desCell.player = cell.player;
    desCell.step = cell.step;
}
function go_cellHasPlayer(cell){
    return cell.player > 0 ;
}
function go_cellHasStep(cell){
    return cell.step > 0 ;
}


//图计算
var go_defaultMaxX = 19;
var go_defaultMaxY = 19;
function go_createMap(maxX,maxY){
    var map = [];
    maxX = maxX > 0 ? maxX : go_defaultMaxX;
    maxY = maxY > 0 ? maxY : go_defaultMaxY;
    for(var x = 0 ; x < maxX ; x++){
        var rows = [];
        for(var y = 0; y < maxY ; y++){
            var cell = go_createCell(0,0);
            rows.push(cell);
        }
        map.push(rows);
    }
    return map;
}
function go_mapToString(map){
    var str = '';
    for(var x = 0 ; x < map.length ; x++){
        var line = '';
        for(var y = 0 ; y < map[x].length ; y ++){
            line += go_cellToString(map[x][y]);
        }
        str += line + '\n';
    }
    return str;
}
function go_foreachMap(map,action){
    for(var x = 0 ; x < map.length ; x++){
        for(var y = 0 ; y < map[x].length ; y ++){
            action(x,y);
        }
    }
}
function go_clearMap(map){
    go_foreachMap(map,function(x,y){
        go_clearCell(map[x][y]);
    });
}
function go_isEmptyMap(map){
    var isEmpty = false;
    go_foreachMap(map,function(x,y){
        if(go_isEmptyCell(map[x][y])){
            isEmpty = true;
        }
    });
    return isEmpty;
}
function go_equalMap(srcMap,desMap){
    var equal = true;
    go_foreachMap(srcMap,function(x,y){
        if(go_equalCell(srcMap[x][y],desMap[x][y]) == false ){
            equal = false;
        }
    });
    return equal;
}
function go_copyMap(map,desMap){
    go_foreachMap(map,function(x,y){
        go_copyCell(map[x][y],desMap[x][y]);
    });
}

//图计算 - 基于点和元
function go_mapHasCell(map,point){
    return point.x>=0 &&  point.y>=0 &&
        point.x < map.length &&
        point.y < map[0].length ;
}
function go_getMapCell(map,x,y){
    return map[x][y];
}
function go_getMapCellByPoint(map,point){
    return map[point.x][point.y];
}
function go_mapSetCell(map,point,player,step){
    var cell = go_getMapCellByPoint(map,point);
    if(player){
        cell.player = player;
    }
    if(step){
        cell.step = step;
    }
}
function go_mapClearCell(map,point){
    go_clearCell( go_getMapCellByPoint(map,point));
}
function go_mapCellSetPlayer(map,point,player){
    go_getMapCellByPoint(map,point).player = player;
}
function go_mapCellClearPlayer(map,point){
    go_getMapCellByPoint(map,point).player = 0;
}
function go_mapCellSetStep(map,point,step){
    go_getMapCellByPoint(map,point).step = step;
}
function go_mapCellClearStep(map,point){
    go_getMapCellByPoint(map,point).step = 0;
}
function go_mapClearStep(map){
    go_foreachMap(map,function(x,y){
        go_getMapCell(map,x,y).step = 0;
    });
}
function go_mapEqualCellPlayer(map,srcPoint,desPoint){
    return go_equalCellPlayer( go_getMapCellByPoint(map,srcPoint),go_getMapCellByPoint(map,desPoint));
}

//点计算 - 基于图
function go_getUpPointOnMap(map,point){
    var up = go_getUpPoint(point);
    if( go_mapHasCell(map,up)){
        return up;
    }else{
        return null;
    }
}
function go_getUpPointOnMapByPlayer(map,point,player){
    var up = go_getUpPointOnMap(map,point);
    if(up){
        var cell = go_getMapCellByPoint(map,up);
        if(cell.player == player){
            return up;
        }
    }
    return null;
}
function go_getDownPointOnMap(map,point){
    var down = go_getDownPoint(point);
    if( go_mapHasCell(map,down)){
        return down;
    }else{
        return null;
    }
}
function go_getDownPointOnMapByPlayer(map,point,player){
    var down = go_getDownPointOnMap(map,point);
    if(down ){
        var cell = go_getMapCellByPoint(map,down);
        if(cell.player == player){
            return down;
        }
    }
    return null;
}
function go_getLeftPointOnMap(map,point){
    var left = go_getLeftPoint(point);
    if( go_mapHasCell(map,left)){
        return left;
    }else{
        return null;
    }
}
function go_getLeftPointOnMapByPlayer(map,point,player){
    var left = go_getLeftPointOnMap(map,point);
    if(left){
        var cell = go_getMapCellByPoint(map,left);
        if(cell.player == player){
            return left;
        }
    }
    return null;
}
function go_getRightPointOnMap(map,point){
    var right = go_getRightPoint(point);
    if( go_mapHasCell(map,right)){
        return right;
    }else{
        return null;
    }
}
function go_getRightPointOnMapByPlayer(map,point,player){
    var right = go_getRightPointOnMap(map,point);
    if(right){
        var cell = go_getMapCellByPoint(map,right);
        if(cell.player == player){
            return right;
        }
    }
    return null;
}

//块计算 - 基于点计算和图
function go_foreachBlock(block , action){
    for(var i = 0 ; i < block.length ; i ++){
        action(block[i],i);
    }
}
function go_blockHasPoint(block,point){
    for(var i = 0 ; i< block.length ; i++){
        if( go_equalPoint(block[i],point) ){
            return true;
        }
    }
    return false;
}
function go_norepeatBlock(block){
    var newBlock = [];
    go_foreachBlock(block,function(point){
        if( go_blockHasPoint(newBlock,point) == false ){
            newBlock.push(point);
        }
    });
    return newBlock;
}
function go_isSameBlock(block,desBlock){
    if( block.length != desBlock.length){
        return false;
    }
    go_foreachBlock(block,function(point){
        if( go_blockHasPoint(desBlock,point) == false ){
            return false;
        }
    });
    return true;
}
function go_blockAddPoints(block,points){
    var news = [];
    for(var i = 0 ; i< points.length ; i ++){
        if( go_blockHasPoint(block,points[i]) == false ){
            block.push(points[i]);
            news.push(points[i]);
        }
    }
    return news;
}
function go_getBlockAroundPointByPlayer(map,point,player){
    var block = [];
    var up = go_getUpPointOnMapByPlayer(map,point,player);
    if(up){
        block.push(up);
    }

    var down = go_getDownPointOnMapByPlayer(map,point,player);
    if(down){
        block.push(down);
    }

    var left = go_getLeftPointOnMapByPlayer(map,point,player);
    if(left){
        block.push(left);
    }

    var right = go_getRightPointOnMapByPlayer(map,point,player);
    if(right){
        block.push(right);
    }
    return block;
}
function go_searchBlockAroundPointByPlayer(map,point,player,block){
    var newBlock = go_getBlockAroundPointByPlayer(map,point,player);
    var newPoints = go_blockAddPoints(block,newBlock);
    for(var i = 0 ; i < newPoints.length ; i++){
        go_searchBlockAroundPointByPlayer(map,newPoints[i],player,block);
    }
}
function go_getBlockByPoint(map,point){
    var block = [];
    block.push(point);
    var cell = go_getMapCellByPoint(map,point);
    var player = cell.player;
    go_searchBlockAroundPointByPlayer(map,point,player,block);
    return block;
}
function go_getBlockByMaps(map1,map2){
    var block = [];
    go_foreachMap(map1,function(x,y){
        if( !go_equalCell(map1[x][y],map2[x][y])){
            block.push(go_createPoint(x,y));
        }
    });
    return block;
}
//气计算 - 基于块计算
function go_getLifeAroundPoint(map,point){
    return go_getBlockAroundPointByPlayer(map,point,go_life);
}
function go_getLifeByBlock(map,block){
    var life = [];
    for(var i = 0 ; i < block.length ; i ++){
        var news = go_getLifeAroundPoint(map,block[i]);
        go_blockAddPoints(life,news);
    }
    return life;
}


//吃计算
function go_getEatsByPoint(map,curPoint,desPlayer){
    var eats = [];
    var up = go_getUpPointOnMapByPlayer(map,curPoint,desPlayer);
    if( up){
        var upblock = go_getBlockByPoint(map,up);
        var uplife = go_getLifeByBlock(map,upblock);
        if( uplife.length == 0) go_blockAddPoints(eats,upblock);
    }

    var down = go_getDownPointOnMapByPlayer(map,curPoint,desPlayer);
    if( down){
        var downblock = go_getBlockByPoint(map,down);
        var downlife = go_getLifeByBlock(map,downblock);
        if( downlife.length == 0 )  go_blockAddPoints(eats,downblock);
    }

    var left = go_getLeftPointOnMapByPlayer(map,curPoint,desPlayer);
    if( left){
        var leftblock = go_getBlockByPoint(map,left);
        var leftlife = go_getLifeByBlock(map,leftblock);
        if( leftlife.length == 0 )  go_blockAddPoints(eats,leftblock);
    }

    var right = go_getRightPointOnMapByPlayer(map,curPoint,desPlayer);
    if( right){
        var rightblock = go_getBlockByPoint(map,right);
        var rightlife = go_getLifeByBlock(map,rightblock);
        if( rightlife.length == 0)  go_blockAddPoints(eats,rightblock);
    }

    return eats;
}
function go_getEats(map,curPoint,desPlayer){
    return go_getEatsByPoint(map,curPoint,desPlayer);
}
function go_eat(map,points){
    go_foreachBlock(points,function(point){
        go_mapClearCell(map,point);
    });
    return points.length;
}


//劫计算
function go_setKoPoint(map,point){
    go_getMapCellByPoint(map,point).kopoint = true;
}
function go_isKoPoint(map,point){
    var cell = go_getMapCellByPoint(map,point);
    if( cell.kopoint )
        return cell.kopoint ;
    else
        return false;
}

//落子计算
function go_tryStep(player,point,mapCache){
    var trymap = go_createMap(go_defaultMaxX,go_defaultMaxY);
    var trystep = mapCache.length - 1;
    go_copyMap( mapCache[trystep], trymap);

    if(     go_mapHasCell( trymap,point) &&
        go_isEmptyCell( go_getMapCellByPoint(trymap , point)) &&
        go_isKoPoint(mapCache[trystep],point) == false ){
        go_mapSetCell(trymap,point,player,++trystep);

        var tryblock;
        var trylife;
        var tryeats = go_getEatsByPoint(trymap,point,go_getOpponentPlayer(player));
        if( tryeats.length > 0){
            go_eat(trymap,tryeats);
            tryblock = go_getBlockByPoint(trymap,point);
            trylife = go_getLifeByBlock(trymap,tryblock);
            if( tryeats.length == 1 && trylife.length == 1){
                go_setKoPoint(trymap,tryeats[0]);
            }
        }else{
            tryblock = go_getBlockByPoint(trymap,point);
            trylife = go_getLifeByBlock(trymap,tryblock);
            if( trylife.length == 0 ){
                return 0;
            }
        }
        mapCache.push(trymap);
        return trystep;
    }
    else{
        return 0;
    }
}

//玩家计算
function go_nextPlayer(currentPlayer){
    if( currentPlayer != go_black && currentPlayer != go_white  ){
        return go_black;
    }else{
        currentPlayer = currentPlayer == go_white ? go_black : go_white ;
        return currentPlayer;
    }
}
function go_getOpponentPlayer(curPlayer){
    return curPlayer == go_white ? go_black : go_white ;
}
function go_playerToString(player){
    if( player == go_black ){
        return '黑棋';
    }
    else if(player == go_white){
        return '白棋';
    }
}

//围棋API - 创建围棋 - 围棋数据结构
function api_createWeiqi(infomation,date,firstPlayer,firstMap){

    var weiqi = {};

    if( infomation ){
        weiqi.infomation = infomation;
    }else{
        weiqi.infomation = '';
    }

    if( date )
        weiqi.date = date;
    else
        weiqi.date = new Date();

    if( firstPlayer ){
        weiqi.currentPlayer = firstPlayer;
    }else{
        weiqi.currentPlayer = go_black;
    }
    weiqi.nextPlayer = function(){
        weiqi.currentPlayer = go_nextPlayer(weiqi.currentPlayer);
    };
    weiqi.showNumber = true;

    weiqi.maps = [];
    var map =  go_createMap(go_defaultMaxX,go_defaultMaxY);
    if( firstMap ){
        go_copyMap(firstMap,map);
        go_foreachMap(map,function(x,y){
            map[x][y].step = 0;
        });
    }
    weiqi.maps.push(map);


    weiqi.steps = [];
    weiqi.steps.push({player:0,point:{x:-1,y:-1}});
    weiqi.tryStep = function(point,player){
        player = player?player:weiqi.currentPlayer;
        var trystep = go_tryStep(player,point,weiqi.maps);
        if( trystep ){
            var step = {};
            step.player = player;
            step.point = go_createPoint(point.x,point.y);
            weiqi.steps.push(step);
            weiqi.nextPlayer();
        }
        return trystep;
    };
    weiqi.hasStep = function(num){
        return weiqi.maps[num] ;
    };
    weiqi.getStepLen = function(){
        return weiqi.steps.length-1;
    };

    weiqi.back = function(){

    };

    weiqi.toSgf = function(){
        var sgf = {};
        sgf.SZ = 19;
        sgf.PB = 'B';
        sgf.PW = 'W';
        sgf.steps = weiqi.steps.slice(1);
        return sgf_tostring(sgf);
    };

    /*
     weiqi.refreshNumber = function(dom_map,step){
     if( step >= 0  && step <= weiqi.getStepLen() ){
     dom_refreshMapNumber(weiqi.maps[step],dom_map,weiqi.showNumber);
     }else{
     dom_refreshMapNumber(weiqi.maps[weiqi.getStepLen()],dom_map,weiqi.showNumber);
     }
     };
     */
    weiqi.lastRefreshMap = [];
    if(firstMap){
        weiqi.lastRefreshMap = firstMap;
    }else{
        weiqi.lastRefreshMap = go_createMap(go_defaultMaxX,go_defaultMaxY)
    }
    weiqi.refreshQizi = function(dom_map,step){
        if( step < 0 ){
            step = 0;
        }else if(step > weiqi.getStepLen()){
            step = weiqi.getStepLen();
        }
        var map = weiqi.maps[step];
        var block = go_getBlockByMaps(map,weiqi.lastRefreshMap);
        dom_refreshBlockBGImg(block,map,dom_map,weiqi.showNumber);
        weiqi.lastRefreshMap = map;
    };
    weiqi.GetMap = function (step) {
        step = step ? step : weiqi.getStepLen();
        return weiqi.maps[step];
    };
    return weiqi;
}





///sgf
function sgf_getLines(sgfString){
    var reg = /;([^;)]*)/g;
    var rs = [];
    var rt = reg.exec(sgfString);
    while( rt ){
        rs.push(rt[1]);
        rt = reg.exec(sgfString);
    }
    return rs;
}
function sgf_getItemsByLine(sgfLine){
    var reg = /([a-z]{1,2})\[([^\]]*)\]/gi;
    var rs = [];
    var rt = reg.exec(sgfLine);
    while(rt){
        rs.push(rt);
        rt =  reg.exec(sgfLine);
    }
    return rs;
}

function sgf_getInfoByLine(sgfTitleLine){
    var titleLine = sgf_getItemsByLine(sgfTitleLine);
    var info = [];
    for(var i = 0 ; i < titleLine.length ; i++){
        info[titleLine[i][1]]=titleLine[i][2];
    }
    return info;
}
function sgf_infoToString(sgf_info){
    var str = '';
    for(var key in sgf_info){
        str+= key + '=' + sgf_info[key] + '\n';
    }
    return str;
}

function sgf_getStepByLine(sgfStepLine){
    var stepLine = sgf_getItemsByLine(sgfStepLine);
    var step = {};
    if( !stepLine[0] ){
        return null;
    }
    if( stepLine[0][1] === 'B' || stepLine[0][1] === 'b'){
        step.player = go_black;
    }
    else if( stepLine[0][1] === 'W' || stepLine[0][1] === 'w'){
        step.player = go_white;
    }else{
        return null;
    }
    if( stepLine[0][2].length = 2 ){
        var point = {};
        point.x = stepLine[0][2].charCodeAt(0) - 'a'.charCodeAt(0);
        point.y = stepLine[0][2].charCodeAt(1) - 'a'.charCodeAt(0);
        step.point = point;
    }else{
        return null;
    }
    return step;
}
function sgf_playerToString(player){
    return player == go_black ? 'B' : 'W';
}
function sgf_pointToString(point){
    return String.fromCharCode(point.x+'a'.charCodeAt(0)) + String.fromCharCode(point.y+'a'.charCodeAt(0));
}
function sgf_stepToString(sgf_step){
    var str = '';
    str += sgf_playerToString(sgf_step.player);
    str += '[';
    str += sgf_pointToString(sgf_step.point);
    str += ']';
    return str;
}

function sgf_create(sgfString){
    var sgf = {};

    var lines = sgf_getLines(sgfString);
    var info = sgf_getInfoByLine(lines[0]);

    for(var key in info){
        sgf[key] = info[key];
    }

    var steps = [];
    for( var i = 1 ; i < lines.length ; i ++){
        var step = sgf_getStepByLine(lines[i]);
        steps.push(step);
    }
    sgf.steps = steps;
    return sgf;
}
function sgf_tostring(sgf){
    var str = '(;';
    if( sgf['SZ']){
        str+='SZ['+sgf['SZ']+']';
    }
    if( sgf['PB']){
        str+='PB['+sgf['PB']+']';
    }
    if( sgf['PW']){
        str+='PW['+sgf['PW']+']';
    }
    for(var i = 0 ; i < sgf.steps.length ; i++){
        str += ';';
        str+= sgf_stepToString(sgf.steps[i]);
    }
    str += ')';
    return str;
}



