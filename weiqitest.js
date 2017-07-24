var p1 = new Point();
console.log(p1 instanceof Point);
console.log('str()', p1.Str()==='[undefined,undefined]');
console.log('equals()', p1.Equals(new Point()));
console.log('Bool()', p1.Bool() ===  false);
console.log('copy()', p1.Equals(p1.Clone()));
var p2 = new Point(0, 0);
console.log('Get...', p2.GetUp().Equals(new Point(0, -1)));
console.log('Get...', p2.GetDown().Equals(new Point(0, 0+1)));
console.log('Get...', p2.GetLeft().Equals(new Point(0-1, 0)));
console.log('Get...', p2.GetRight().Equals(new Point(0+1, 0)));

var ps1 = new PointSet();
console.log(ps1 instanceof PointSet);
ps1.Add(p1);
ps1.Add(p2);
console.log('str()', ps1.Str()==='[undefined,undefined], [0,0]');


var m1 = new CellMap(5);
console.log(m1.Str());
console.log(m1.StrPlayer());