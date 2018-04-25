let m;
let b;

let xBres
let xDDA
let xPP
let y
let xaux
let yaux
let size
let angleBres
let angleDDA
let anglePP
let frame=50;
let dirBres=5;
let dirDDA=dirBres;
let dirPP=dirDDA;

let velBres=1
let velDDA=1
let velPP=1

let dx
let dy

let p;

function setup() {
	
	createCanvas(windowWidth, windowHeight);
	y=height/2
	size=200;
	xBres=200
	xDDA=xBres+50+size*2
	xPP=xDDA+50+size*2
	angleBres=45;
	angleDDA=angleBres
	anglePP=angleDDA
	//frameRate(frame)

}

function PP(x0,y0,x1,y1){
	let m;
	let b;
	m=(y1-y0)/(x1-x0);
	b=y0-m*x0
	if (x0<x1){
		do{
			y0=m*x0+b
			x0++	
			point(x0,y0);
			point(x1,y1);
		}while(x0<x1)
	}else if (x0>x1) {
		do{
			y0=m*x0+b
			x0--	
			point(x0,y0);
			point(x1,y1);
		}while(x0>x1);
	}else{
		do{
			point(x0,y0);
			point(x1,y1);
			y0++;
		}while(y0<y1)
	}

}

function DDA(x0,y0,x1,y1){	

	if (x0>x1 && y0>y1) {
		p=x0
		x0=x1
		x1=p

		p=y0
		y0=y1
		y1=p
	}

	dx=Math.abs(x1-x0)
	dy=Math.abs(y1-y0)

	if (dx>=dy) {
		p=dx;
	}else{
		p=dy;
	}
	
	if((x1-x0)<0){
		
		dx*=-1
	}
	if ((y1-y0)<0) {
		
		dy*=-1
	}
	dx=dx/p
	dy=dy/p

	for(let i=1;i<=p;i++){
		
		point(x0,y0)
		x0+=dx
		y0+=dy
	}
	
}

function bresenham(x0,y0,x1,y1){

	let aux

	let aumentoX
	let aumentoY

	dx=Math.abs(x0-x1)
	dy=Math.abs(y0-y1)
	aumentoX= sign(x0-x1)
	aumentoY= sign(y0-y1)

	if (dy>dx) {
		aux=dx
		dx=dy
		dy=aux
		m = 1
	}else{
		m = 0
	}

	p=2*dy-dx
	for(let i=1;i<=dx;i++){
		point(x1,y1)
		if (p>=0) {
			if (m===1) {
				x1=x1+aumentoX
			}else{
				y1=y1+aumentoY
			}
			p=p-(2*dx)
		}
		if (m===1) {
			y1=y1+aumentoY
		}else{
			x1=x1+aumentoX
		}
		p=p+2*dy
	}
}

function sign(num){
	let res
	if (num<0) {
		res=-1
	}
	if (num>0) {
		res=1
	}
	if (num===0) {
		res=0
	}
	return res
}

function draw() {
	
	stroke("red")
	ellipseMode(RADIUS)
	for(let j=0;j<velBres;j++){
		ellipse(xBres,y,size,size)	

		xaux=Math.cos(angleBres*PI/180)*size;
		yaux=Math.sin(angleBres*PI/180)*size;
		bresenham(xBres,y,xBres+xaux,y+yaux)
		for(let i=1;i<8;i++){
			angleBres+=45
			xaux=Math.cos(angleBres*PI/180)*size;
			yaux=Math.sin(angleBres*PI/180)*size;
			bresenham(xBres,y,xBres+xaux,y+yaux)
		}
		angleBres+=dirBres
	}
	

	for(let j=0;j<velDDA;j++){
		ellipse(xDDA,y,size,size)
		xaux=Math.cos(angleDDA*PI/180)*size;
		yaux=Math.sin(angleDDA*PI/180)*size;
		DDA(xDDA,y,xDDA+xaux,y+yaux)
		for(let i=1;i<8;i++){
			angleDDA+=45
			xaux=Math.cos(angleDDA*PI/180)*size;
			yaux=Math.sin(angleDDA*PI/180)*size;
			DDA(xDDA,y,xDDA+xaux,y+yaux)
		}
		angleDDA+=dirDDA
	}

	for(let j=0;j<velPP;j++){

		ellipse(xPP,y,size,size)
		xaux=Math.cos(anglePP*PI/180)*size;
		yaux=Math.sin(anglePP*PI/180)*size;
		PP(xPP,y,xPP+xaux,y+yaux)
		for(let i=1;i<8;i++){
			anglePP+=45
			xaux=Math.cos(anglePP*PI/180)*size;
			yaux=Math.sin(anglePP*PI/180)*size;
			PP(xPP,y,xPP+xaux,y+yaux)
		}
		anglePP+=dirPP
	}

	//line(x,y,x,y+size/2)
	//line(x,200,size,200)

	/*bresenham(width-10,10,10,height-10)
	bresenham(width/2+300,height-20,width-100,20)

	bresenham(10,10,width-10,height-10)
	bresenham(100,20,width/2-300,height-20)*/

	//noLoop()
}

function masBres(){
	velBres++
}
function menosBres(){
	if(velBres >1)
	velBres--
}
function direccionBres(){
	dirBres*=-1
}

function masDDA(){
	velDDA++;
}
function menosDDA(){
	if(velDDA >1)
	velDDA--;
}
function direccionDDA(){
	dirDDA*=-1
}

function masPP(){
	velPP++;
}
function menosPP(){
	if(velPP >1)
	velPP--
}
function direccionPP(){
	dirPP*=-1
}