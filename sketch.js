function setup() {
  createCanvas(800, 400);
}

var jogo = true

function draw() {
  strokeWeight(0)
  if(jogo == true){
    background(100);
    intervalo()
    faixa()
    fazCone()
    pneu()
    gravidade()
    colide()
  } else if(mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(87) || keyIsDown(83)){
    cones = []
    faixas = []
    jogo = true
  }
}


var posY = 300

function pneu(){
  
  fill(20)
  ellipse(150, posY, 100)
  fill(100)
  ellipse(150, posY, 50)
}


var grav = 1
var accel = 0

function gravidade(){
  accel += grav
  posY += accel
  if(posY > 300){
    posY = 300
    if(keyIsDown(UP_ARROW) || keyIsDown(87) || mouseIsPressed){
      accel = - 20
    }
  }else if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    accel += 20
  }
  if(accel > 20){accel = 20}
}


var inter = [0,0]

function intervalo(){
  if(millis() > inter[0]+1000){
    faixas.push([800,360])
    inter[0] = millis()
  }
  if(millis() > inter[1]+randomNum(1000,2000)){
    cones.push([850,300])
    inter[1] = millis()
  }
}


var faixas = []

function faixa(){
  fill(10)
  rect(0, 330, 800, 70)
  fill("yellow")
  for(var i of faixas){
    i[0] -= 10
    rect(i[0], i[1], 150, 5)
    if(i[0]<-450){faixas.splice(faixas.indexOf(i),1)}
  }
}


var cones = []

function fazCone(){
  fill(255,80,0)
  for(var j of cones){
    j[0] -= 10
    triangle(j[0], j[1] - 50,  
             j[0] - 30, j[1] + 50,  
             j[0] + 30, j[1] + 50)
    if(j[0]<-450){cones.splice(cones.indexOf(j),1)}
  }
}

function randomNum(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var lim = 30
var altu = 100
var larg = lim


var raio = 50
var quant = 90

function colide(){
  for(var c of cones){
    var poly = [createVector(c[0], c[1] - 50),  
             createVector(c[0] - 30, c[1] + 50),  
             createVector(c[0] + 30, c[1] + 50)]
    if(collideCirclePoly(150, posY, 100, poly)){
      jogo = false
    }
  }
}
