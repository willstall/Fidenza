/*



# Tasks

Try out puzzle a that has the path rotating 90 degrees down
Take another look at the scoring algorithm, get % complete
Plan a way to rearchitect game so that levels can be made with different paths and inputs
Create Menu Screen
Create Level Over Menu
Create Level Select Menu



*/

const lerp = (x, y, a) => x * (1 - a) + y * a;
const fract = (x) => x-floor(x);

var trails = [];

var initialMousePosition;
var currentMousePosition;

function main()
{
	setup();	

	document.ontouchstart = ( mouseDown ).bind( this );
	document.onmousedown = ( mouseDown ).bind( this );

	createTrails();

	container.on("tick", update, this);
}

function createTrails()
{
	noise.seed(Math.random());
	for(var i = 0; i < trails.length; i++)
	{
		var trail = trails[i];
		container.removeChild( trail );
	}

	// Trails
	var amount = lerp(30,160,Math.random());
	// var dist = 50;

	for(var i = 0; i < amount; i++)
	{
		var dist = lerp(3,30,Math.random());
		var a = i/amount;

		var o = {
			x: dist*Math.sin(Math.PI*2.0*a),
			y: dist*Math.cos(Math.PI*2.0*a)
		};
		var trail = createTrail();
			trail.x = o.x;
			trail.y = o.y;
			trail.origin = o;
			trail.angle = a;
			trail.setRandomColor();
			trail.maxPoints = lerp(10,200,Math.random());
			trail.colorResetFrameTimeout = lerp(4,30,Math.random());
			trail.seed = Math.random();

		trails[i] = trail;
		container.addChild( trail );
	}

}
function createTrail()
{
	let trail = new Trail();
	trail.targetX = trail.targetY = 0;
	
	trail.accel = 1.0;//.97;
	trail.width = lerp(6,30,Math.pow(Math.random(),4.0));
	trail.compositeOperation = ""
	// trail.compositeOperation = "xor";

	trail.setColor
		({
			r : 0,
			g : 0,
			b: 0,
			a: 1
		});

	var hohoukumColors = [
		{r: 250, g:	167, b:	55	, a: 1},
		{r: 234, g:	87, b:	79	, a: 1},
		{r: 227, g:	37, b:	126	, a: 1},
		{r: 157, g:	38, b:	122	, a: 1},
		{r: 133, g:	66, b:	153	, a: 1},
		{r: 64, g:	131, b:	194	, a: 1},
		{r: 45, g:	189, b:	228	, a: 1},
		{r: 245, g:	245, b:	245	, a: 1}
	];

	trail.setColors( hohoukumColors );
	trail.drawPoints();

	return trail;	
}

function mouseUp( event )
{
	// trail.clearPoints();
	// trail.update();
}

function mouseDown( event )
{
	createTrails();
}


function rotate_point(origin, point, angle)
{
	var radians = angle * Math.PI / 180.0,
	cos = Math.cos(radians),
	sin = Math.sin(radians),
	dX = point.x - origin.x,
	dY = point.y - origin.y;

	return {
	x: cos * dX - sin * dY + origin.x,
	y: sin * dX + cos * dY + origin.y
	};
}

function update( event )
{
	let d = 20.0;
	let scale = 1000;
	
	for(var i = 0; i < trails.length; i++)
	{
		var trail = trails[i];
		// scale = lerp(100,1000,trail.seed);
		// if(Math.abs(trail.targetX) >= stage.width)
		// {
		// 	trail.clearPoints();
		// 	trail.targetX = trail.origin.x;
		// 	trail.targetY = trail.origin.y;
		// }

		// if(Math.abs(trail.targetY) >= stage.height)
		// {
		// 	trail.clearPoints();
		// 	trail.targetX = trail.origin.x;
		// 	trail.targetY = trail.origin.y;
		// }

		var value = noise.simplex2(trail.targetX / scale, trail.targetY / scale);

		let a = value*2.0-1.0;
		var radians = a * Math.PI / 180.0;

		let p = {
			x:trail.x,
			y:trail.y
		};

		let t = {
			x:trail.x + d*Math.sin(a+a+trail.angle),
			y:trail.y + d*Math.cos(a+a+trail.angle)
		};

		trail.targetX += t.x;
		trail.targetY += t.y;

		trail.update();
	}
}