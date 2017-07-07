/**
 * Created by 国锋 on 2017/7/7.
 */


function Weiqi (canvas_id) {
    var Weiqi = {};

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
        //设置棋盘大小。
        /**
         * @return {number}
         */
        Weiqi.GetDisplaySize = function () {
            return CellSize;
        };
        /**
         * @return {number}
         */
        Weiqi.GetLineNumber = function () {
            return Lines;
        };
        Weiqi.SetChessBoardSize = function (cell_size, line_number) {
            if (cell_size) {
                if (cell_size < 10 ) {
                    cell_size = 10;
                }
            } else {
                cell_size = 25;
            }
            CellSize = cell_size;
            if (line_number) {
                if (line_number > TagY.length ) {
                    line_number = TagY.length;
                } else if (line_number < 9 ) {
                    line_number = 9;
                }
            } else {
                line_number = 19;
            }
            Lines = line_number;
            BoardSize = CellSize*(Lines-1);
            BoardMargin = CellSize*1.5;
            BoardStartXY = BoardMargin - CellSize/2;
            CanvasSize = CellSize*(Lines+2);
            Canvas.width = CanvasSize;
            Canvas.height = CanvasSize;
        };
        //画棋盘
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

        //事件绑定。
        Weiqi.OnMove = null;
        Canvas.onclick = function (e) {
            var x = Math.floor((e.clientX-Canvas.getBoundingClientRect().left-BoardStartXY)/CellSize);
            var y = Math.floor((e.clientY-Canvas.getBoundingClientRect().top-BoardStartXY)/CellSize);
            if (x >= 0 && x < Lines && y >= 0 && y < Lines){
                if (Weiqi.OnMove) {
                    Weiqi.OnMove(x, y);
                } else {
                    Weiqi.DrawChessPiece( x, y, 1);
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
        /** 绘制棋子
         * @return {boolean}
         */
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

        //全局绘制棋盘。
        Weiqi.Draw = function () {
            Weiqi.DrawBackgroundImage();
            Weiqi.DrawChessBoard();
        };

        //根局图全局绘制棋盘和棋子。
        Weiqi.Refresh = function (map) {
            Weiqi.Draw();
            Weiqi.DrawChessPieceMany(map);
        };

        return Weiqi;
    }

    Weiqi.Ui = WeiqiCanvas(canvas_id);

    //显示大小设置。
    Weiqi.SetDisplaySize = function (size) {
        Weiqi.Ui.SetChessBoardSize(size, Weiqi.Ui.GetLineNumber());
        Weiqi.Ui.Draw();
    };
    Weiqi.SetLineNumber = function (number) {
        Weiqi.Ui.SetChessBoardSize(Weiqi.Ui.GetDisplaySize(), number);
        Weiqi.Ui.Draw();
    };

    //设置棋谱.
    var Sgf = "";
    Weiqi.SetSgf = function (sgf) {
        Sgf = sgf;
    };

    //查谱
    Weiqi.Goto = function () {

    };
    Weiqi.Next = function () {

    };
    Weiqi.Previous = function () {

    };
    Weiqi.First = function () {

    };
    Weiqi.Last = function () {

    };



    //分支
    Weiqi.NewBranch = function () {

    };
    Weiqi.DelBranch = function () {

    };
    Weiqi.SelectBranch = function () {

    };
    Weiqi.OutBranch = function () {

    };

    //重置棋谱
    Weiqi.Reset = function () {

    };

    return Weiqi;
}