<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <title>围棋</title>
</head>
<body style="text-align: center">
 <canvas id="weiqi"></canvas>

 <script src="weiqicore.js" type="text/javascript"></script>
 <script src="weiqi-ui.js" type="text/javascript"></script>
 <script language="JavaScript">
     var Unit = WeiqiUnit(WeiqiMap(19), WEIQI_BLACK);
     var ui = WeiqiCanvas('weiqi');
     ui.AddBackgroundImageSrcList(['bg.png', 'mw1.png', 'mw2.png', 'mw3.png']);
     ui.SetChessPieceImageSrc('b.png', 'w.png');
     ui.SetBackgroundImage(2);
     ui.Load();
     ui.OnMove = function (x, y) {
         var point = WeiqiPoint(x, y);
         Unit.Move(point);
         ui.Draw();
         var map = Unit.GetLastMove().GetMap();
         map.Foreach(function (p, player) {
             ui.DrawChessPiece(p.X(), p.Y(), player);
         });
     };
 </script>
</body>
</html>