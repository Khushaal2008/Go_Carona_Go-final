//variables
var bg1, bg1Img,bg2 ,bg2Img, start, startImg;
var End = 0
var back = 1
var con = 2
var Play = 3
var serve = 4
var gameState = serve;
var Protiens = 0
var life = 3
var corona,coronaImg,coronaGroup,mask,maskGroup,maskImg,sanitizer,sanitizerGroup,sanitizerImg,floor,floorGroup,floorImage,vaccine,vaccineGroup,vaccineImg,protien,protienGroup,protienImg
var invisibleGround;
var infected,infectedImg;
var continueB,continueImg
var reset,resetImg
var InvPro,Invmask
var shield,shieldImg;
var timer = 20
var timerMask = 15
var timerText = 0
var sMario,sMario_running
var sMario_mask,S_MmaskImg
var score = 0


// preload function
function preload(){
bg2Img = loadImage("background.jpg");
bg1Img = loadImage("Go Carona Go.png")
startImg = loadImage("button.png")
coronaImg = loadImage("Carona.png")
sanitizerImg = loadImage("Sanitizer.png")
maskImg = loadImage("Mask.png")
floorImage = loadImage("floor.png")
shieldImg = loadImage("Shield.png")
vaccineImg = loadImage("vaccine.png")
protienImg = loadImage("ProtienFood.png")
sMario_running = loadAnimation("marioWalking1.png","marioWalking2.png","marioWalking3.png")
sMario_Collided = loadAnimation("marioWalking3.png")
S_MmaskImg = loadImage("mario3.png")
resetImg = loadImage("button_reset.png")
infectedImg = loadImage("Infected.jpg")
continueImg = loadImage("button_continue.png")

}

//setup function
function setup(){
createCanvas(1000, 900)

coronaGroup = new Group();
maskGroup = new Group();
floorGroup = new Group()
sanitizerGroup = new Group();
vaccineGroup = new Group();
protienGroup = new Group();

invisibleGround = createSprite(500,860,10000000000,10)
invisibleGround.visible = false


bg2 = createSprite(750,450)
bg2.addImage(bg2Img)
bg2.scale = 3


sMario = createSprite(205,700)
sMario.addAnimation("running",sMario_running)
//sMario.addAnimation("mask",sMario_mask)
sMario.scale = 0.1
//sMario.debug = true
sMario.setCollider("rectangle",0,0,800,2000)

sMario_mask = createSprite(205,700)
sMario_mask.addImage(S_MmaskImg)
sMario_mask.scale = 0.3
sMario_mask.visible = false

bg1 = createSprite(500,450)
bg1.addImage(bg1Img)
bg1.scale = 0.75



start = createSprite(width/2,height/2)
start.addImage(startImg)
start.scale = 1.5


infected = createSprite(width/2,height/2)
infected.addImage(infectedImg)
infected.scale = 4.9
//infected.visible = false

continueB = createSprite(width/2, height/2)
continueB.addImage(continueImg)

reset = createSprite(500,500)
reset.addImage(resetImg)
reset.scale = 1;
reset.visible = false

InvPro = createSprite(-100000,450,10,100000000)
InvPro.visible = false

Invmask = createSprite(-100000,450,10,100000000)
Invmask.visible = false

shield = createSprite(100000,700)
shield.addImage(shieldImg)
shield.scale = 0.5

}

//draw function
function draw(){
sMario.collide(invisibleGround);



  drawSprites()
  sMario.velocityX = 0
  if(gameState === serve){
    infected.visible = false
    continueB.visible = false
    textSize(22)
    fill("yellow")
    text("If you play this game for 2-3 min then you will get some mask, sanitizer, vaccine, some protien food etc",1,height/1.5)
  //start.onMousePressed =function(){ start.visible= false; bgScreen2.velocityX = -6}
  if(mousePressedOver(start) || touches.length){
    start.remove()
      gameState = Play
      bg2.velocityX = -5
      bg1.remove()
  }
  }
if(gameState === Play){
  textSize(25)
  fill("yellow")
  text("Score: "+ score, 800,50);
  score = score + Math.round(getFrameRate()/60);
infected.visible = false
//continueB.visible = false
sMario.velocityX = 0

  text("You Infected")
      textSize(30)
    fill("lightgreen")
  text("Protiens = " + Protiens,50,50)
  fill("red")
  text("Life = " + life,width/2,50)

  bg2.velocityX = -5
  if(bg2.x < 90){
    bg2.x = bg2.width/1
  }


  if(life > 3){
    life -= 1
  }


if(sMario.isTouching(coronaGroup)){
  life -= 1
  coronaGroup.destroyEach();
 gameState = con



}
if(life < 1){
  gameState = End
}

if(InvPro.isTouching(coronaGroup)){
  coronaGroup.destroyEach()
}

if(Invmask.isTouching(coronaGroup)){
  coronaGroup.destroyEach()
}

if(sMario.isTouching(maskGroup)){
  maskGroup.destroyEach()
  life += 1
  sMario.x = 4002
  sMario_mask.visible = true
  Invmask.x = 402
  
}


if(timerMask < 1){
  //shield.hide()
  Invmask.x = 3000
  sMario.x = 203
  sMario_mask.visible = false
  timerMask = 20
}


if(Invmask.x === 402){
  timerMask -= 0.03
  textSize(30)
  fill("#ff35dc")
  text("This mask will protect you only for 20 second",250,150)
timerText -= 0.05
}

if(sMario.isTouching(vaccineGroup)){
  InvPro.x = 402
shield.x = 402
    vaccineGroup.destroyEach()
    timerText = 5

  }

  if(timer < 1){
    shield.x = 100000
    InvPro.x = 3000
    timer = 20
  }



  if(InvPro.x === 402){
    timer -= 0.03
    textSize(30)
    fill("#ff35dc")
    text("This Shield will protect you only for 20 second",250,150)
  timerText -= 0.05
  maskGroup.setVelocityXEach(5)
  }
  

    
  if(timerText > 0){
    fill(random(0,255),random(50,255),random(100,255))
    text("Wow!! You just caught the vaccine",250,height/2)
    }
   

if(sMario.isTouching(protienGroup)){
  protienGroup.destroyEach()
  Protiens +=1
}

if(sMario.isTouching(sanitizerGroup)){
  sanitizerGroup.destroyEach();
  life += 1
}




if(keyDown("space") && sMario.y >= 500){
  sMario.velocityY = -72
  
}

if(touches.length && sMario.y >= 550){
  sMario.velocityY = -72
  
}
sMario.velocityY = sMario.velocityY + 4

if(life < 1){
  gameState = End
}

  Objects()

//sMario.collide(floorGroup)

if(sMario.x < 195){
  gameState = back
}



}

if(gameState === con){
  bg2.velocityX = 0
  infected.visible = true
  continueB.visible = true
  if(mousePressedOver(continueB) || touches.length){
    gameState = Play
    continueB.visible = false
   // sMario.x = 200
  }
}

if(gameState === back){
  
 // bg2.velocityX = 0
 continueB.visible = true
  sMario.changeAnimation("collide",sMario_Collided)
  textSize(20)
  fill("yellow")
  text("Please don't do that again otherwise you will lose your life",300,300)
  bg2.velocityX = 0
  sMario.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  //floorGroup.setVelocityXEach(0)
  
 /* coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()*/
  if(mousePressedOver(continueB) || touches.length){
    gameState = Play
    sMario.changeAnimation("running",sMario_running)
sMario.x = 200
sMario.y = 500
coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
//floorGroup.setVelocityXEach(-7)
  }
}


if(gameState===End){
  reset.visible = true


  sMario.changeAnimation("collide",sMario_Collided)
  infected.visible = false
  continueB.visible = false
  bg2.velocityX = 0
  sMario.velocityY = 0
  coronaGroup.setVelocityXEach(0)
  maskGroup.setVelocityXEach(0)
  sanitizerGroup.setVelocityXEach(0)
  vaccineGroup.setVelocityXEach(0)
  protienGroup.setVelocityXEach(0)
  //floorGroup.setVelocityXEach(0)
  
  coronaGroup.setLifetimeEach(-1)
maskGroup.setLifetimeEach(-1)
sanitizerGroup.setLifetimeEach(-1)
vaccineGroup.setLifetimeEach(-1)
protienGroup.setLifetimeEach(-1)
//floorGroup.setLifetimeEach(-1)

if(mousePressedOver(reset)|| touches.length){
  Reset()
}

}


}

// function for creating objects like carona, mask etc.
function Objects(){

// To display carona at random places
if(frameCount % 60 === 0){
corona = createSprite(1010,random(427,850))
corona.addImage(coronaImg)
// corona.debug = true
corona.scale = 0.2
corona.setCollider("rectangle",0,0,200,200)
corona.velocityX = -8
coronaGroup.add(corona)
}


/*if(frameCount % 500 ===0){
floor = createSprite(1000,50,100,30)
  floor.addImage(floorImage)
  floor.scale = 0.2
    floor.velocityX = -7
    floor.lifetime = 800; 
   // floor.debug = true
    floor.setCollider("rectangle",0,0,1500,270)
    floor.y = Math.round(random(756,800))
  floorGroup.add(floor)  
 
}*/

// To display mask at random places
if(frameCount % 659===0){                  
  mask = createSprite(1000,random(427,850))
 mask.addImage(maskImg)
 mask.scale = 0.1
   mask.velocityX = -7
   //mask.x = floor.x
   mask.lifetime = 800;
   maskGroup.add(mask)
 }

// To display sanitizers at random places
if(frameCount % 533===0){
  sanitizer = createSprite(1000,(427,850))
  sanitizer.addImage(sanitizerImg)
  sanitizer.scale = 0.3
  sanitizer.velocityX = -7
  sanitizer.lifetime = 800
  sanitizerGroup.add(sanitizer)
}

// To display vaccine at random places
if(frameCount % 1159=== 0){
  vaccine = createSprite(1000,(835,851))
  vaccine.addImage(vaccineImg)
  vaccine.scale = 0.1
  vaccine.velocityX = -7
  vaccineGroup.add(vaccine)
}


if(frameCount % 555 === 0){
  protien = createSprite(1000,random(835,851))
  protien.addImage(protienImg)
  protien.scale = 0.4
  protien.velocityX = -7
  protienGroup.add(protien)
}


}

function Reset(){
  gameState = Play
  reset.visible = false
  coronaGroup.destroyEach();
  maskGroup.destroyEach()
  sanitizerGroup.destroyEach()
  vaccineGroup.destroyEach()
  protienGroup.destroyEach()
  floorGroup.destroyEach()
bg2.velocityX = -6
life = 3
Protiens = 0
sMario.changeAnimation("running",sMario_running)
  coronaGroup.setVelocityXEach(-8)
maskGroup.setVelocityXEach(-7)
sanitizerGroup.setVelocityXEach(-7)
vaccineGroup.setVelocityXEach(-7)
protienGroup.setVelocityXEach(-7)
floorGroup.setVelocityXEach(-7)
}
































































/* Variables
var start,startImg,rules,rulesImg,corona,coronaImg,coronaGroup,bg,bgImg,Super,SuperImg,sanitizer,sanitizerImg,mask,maskImg,bg2;
var bgScreen2,sanitizerGroup,maskGroup,floor,floorGroup,floorImage
var Play = 1
var End = 0
var gameState;
//var Score = 0
var sMario,sMario_running,sMario_Collided
var invisibleGround;
var slideImg
var life = 3
var Protiens = 0
var InvPro
var shield,shieldImg
var timer = 10
var timerText = 0
var vaccine,vaccineImg,vaccineGroup
var protien,protienImg,protienGroup
var End = 0
var Play = 1
var serve = 2
var gameState = serve;
var Score = 0
var reset, resetImg
var infected,infectedImg;
var sound;
var invmask
var mask2,mask2Img
var timermask = 10

// For loading the objects
function preload(){
startImg = loadImage("button.png")
//rulesImg = loadImage("Rules.png")
coronaImg = loadImage("Carona.png")
bgImg = loadImage("Go Carona Go.png")
//SuperImg = loadImage("Human.png")
sanitizerImg = loadImage("Sanitizer.png")
bg2 = loadImage("background.jpg")
maskImg = loadImage("Mask.png")
floorImage = loadImage("floor.png")
sMario_running = loadAnimation("walking0.png", "walking.png", "walking3.png", "walking4.png", "walking5.png", "walking7.png", "walking8.png", "walking1.png")
slideImg = loadAnimation("slide.png")
shieldImg = loadImage("Shield.png")
vaccineImg = loadImage("vaccine.png")
protienImg = loadImage("ProtienFood.png")
sMario_Collided = loadAnimation("walking.png")
resetImg = loadImage("button_reset.png")
infectedImg = loadImage("Infected.jpg")
sound = loadSound("monkey.mp3");
mask2Img = loadImage("mask2.png")
}

// For setting up
function setup() {
  createCanvas(1000,900);

bgScreen2 = createSprite(750,450)
bgScreen2.addImage(bg2)
bgScreen2.scale = 3
//bgScreen2.velocityX = -5

coronaGroup = new Group();
maskGroup = new Group();
floorGroup = new Group()
sanitizerGroup = new Group();
vaccineGroup = new Group();
protienGroup = new Group();

sMario = createSprite(200,700)
//sMario.addAnimation("collide",sMario_Collided)
sMario.addAnimation("running",sMario_running)
sMario.addAnimation("collide",sMario_Collided)
sMario.scale = 0.5
//sMario.debug = true
sMario.setCollider("rectangle",0,0,200,680)

invisibleGround = createSprite(500,860,10000000000,10)
invisibleGround.visible = false

InvPro = createSprite(-100000,450,10,100000000)
InvPro.visible = false

bg = createSprite(500,450)
bg.addImage(bgImg)
bg.scale = 0.75

start = createSprite(width/2,height/2)
start.addImage(startImg)
start.scale = 1.5

infected = createSprite(width/2,height/2)
infected.addImage(infectedImg)
infected.scale = 5.5
//infected.visible = false

reset = createSprite(500,500)
reset.addImage(resetImg)
reset.scale = 1;
reset.visible = false

sound.loop(0)

invmask = createSprite(245,600,10,10)
invmask.visible = false




}

function draw() {
  background("blue")
  console.log(mouseY)
  if(gameState === serve){
    infected.visible = false
    
  //start.onMousePressed =function(){ start.visible= false; bgScreen2.velocityX = -6}
  if(mousePressedOver(start) || touches.length){
    start.remove()
      gameState = Play
      bgScreen2.velocityX = -5
      bg.remove()
  }
  }

 //reseting the screen


  drawSprites();

  if(gameState === Play){
    sMario.velocityX = 0
    //reseting the screen
    if(bgScreen2.x < 90){
      bgScreen2.x = bgScreen2.width/1
    }
    Objects()
  //Score = Score + Math.round(getFrameRate()/50)
  //bgScreen2.velocityX = -(6 +2*Score/150);
  
  //edges = createEdgeSprites()
  //sMario.collide(edges)
  
  if(life > 3){
    life-=1
  }
  
  if(sMario.x < 0){
    life -= 1
    textSize(20)
    fill("yellow")
    text("Warning :Please Don't Do that again otherwise you will lose your life",300,450)
    gameState = End
  }
  
  // code for jumping effect
  if(keyDown("space") || touches.length && sMario.y >= 550){
    sMario.velocityY = -72
    
  }
  sMario.velocityY = sMario.velocityY + 4
  
      // Writing code for the shield, protection and touching the vaccine
      if(sMario.isTouching(vaccineGroup)){
        InvPro.x = 402
        shield = createSprite(402,700)
          shield.addImage(shieldImg)
          shield.scale = 0.5
          vaccineGroup.destroyEach()
          textSize(30)
          fill(54,46,65)
          text("This Shield will protect you only for 10 second",350,800)
          timerText = 5
        }
  
        if(timer < 1){
          shield.remove()
          InvPro.x = -100000
          timer = 10
        }
         
  
       /* if(life > 3){
          life -=1
        }*/
    
  // to display the the life increase when the sMario is touching the sanitizer
 /* if(sMario.isTouching(sanitizerGroup)){
    life += 1
    sanitizerGroup.destroyEach()
  }
  
  // code for, when sMario is  touching mask what should happen
  if(sMario.isTouching(maskGroup)){
    life += 1
    timermask -= 0.02
    maskGroup.destroyEach()
mask2 = createSprite(100,100)
mask2.addImage(mask2Img)
mask2.scale = 0.15
mask2.x = invmask.x
mask2.y = invmask.y
  }
  

  if(timermask < 1){
mask2.hide()
timermask = 10
  }
  
  //code for, when the corona come near the man then corona should get destroyed
  if(InvPro.isTouching(coronaGroup)){
    coronaGroup.destroyEach()
    
  }
  
  
  
  
  //code for sMario's life
  if(sMario.isTouching(coronaGroup)){
    life -= 1
    infected.visible = true
    timer -= 0.05
    
    /*coronaGroup.setVelocityXEach(0)
    coronaGroup.destroyEach()
       
    coronaGroup.setLifetimeEach(-1)*/
  /*  if(timer>0){
     
      text("You Infected")
      textSize(30)
    fill("lightgreen")
  text("Protiens = " + Protiens,50,50)
  fill("red")
  text("Life = " + life,width/2,50)
  infected.visible = true
      reset.visible = true
      Reset()
     
     // bgScreen2.velocityX = 0
      /*coronaGroup.setVelocityXEach(0)
      maskGroup.setVelocityXEach(0)
      sanitizerGroup.setVelocityXEach(0)
      vaccineGroup.setVelocityXEach(0)
      protienGroup.setVelocityXEach(0)
      floorGroup.setVelocityXEach(0)
  
     
  maskGroup.setLifetimeEach(-1)
  sanitizerGroup.setLifetimeEach(-1)
  vaccineGroup.setLifetimeEach(-1)
  protienGroup.setLifetimeEach(-1)
  floorGroup.setLifetimeEach(-1)*/
  
  /*gameState = End
  
    }
    
  
  }
  
  
  
  
  
  // collision
  sMario.collide(invisibleGround)
  sMario.collide(floorGroup)
  
  
  
  // adding isTouching property to protien food
  if(sMario.isTouching(protienGroup)){
    Protiens += 1
    protienGroup.destroyEach();
  }
  
  //you lose condition
  if(life < 1){
    gameState = End
  }
  
  textSize(30)
    fill("lightgreen")
  text("Protiens = " + Protiens,50,50)
  fill("red")
  text("Life = " + life,width/2,50)
  if(InvPro.x === 402){
    timer -= 0.03
    textSize(30)
    fill(54,46,65)
    text("This Shield will protect you only for 10 second",250,150)
  timerText -= 0.05
  }
  

  
    }
  
    if(gameState === End){
     if(life < 1){
    textSize(30)
    fill("red")
    strokeWeight(5)
    text("YOU Lose 😯",450,450)
    text("It won't Reset because You Lose Please refresh this page",100,600)

     }
  mask2.remove()
     reset.visible = true
     sMario.changeAnimation("collide",sMario_Collided)
    bgScreen2.velocityX = 0
    sMario.velocityY = 0
    coronaGroup.setVelocityXEach(0)
    maskGroup.setVelocityXEach(0)
    sanitizerGroup.setVelocityXEach(0)
    vaccineGroup.setVelocityXEach(0)
    protienGroup.setVelocityXEach(0)
    floorGroup.setVelocityXEach(0)
    
    coronaGroup.setLifetimeEach(-1)
maskGroup.setLifetimeEach(-1)
sanitizerGroup.setLifetimeEach(-1)
vaccineGroup.setLifetimeEach(-1)
protienGroup.setLifetimeEach(-1)
floorGroup.setLifetimeEach(-1)

if(mousePressedOver(reset) || touches.length){
  Reset()
  infected.visible = false
}

  }


  
/*if(InvPro.x === 402){
  timer -= 0.01
  textSize(30)
  fill(54,46,65)
  text("This Shield will protect you only for 10 second",350,800)
  timerText -= 0.01
}*/


 
//console.log(timer)










/*if(sMario.x < 0){
  sMario.x = 200
  sMario.y = 650
}*/






//console.log(mouseY)



//}


// function for creating objects like carona, mask etc.
/*function Objects(){

// To display carona at random places
if(frameCount % 60 === 0){
corona = createSprite(1010,random(427,850))
corona.addImage(coronaImg)
// corona.debug = true
corona.scale = 0.2
corona.setCollider("rectangle",0,0,200,200)
corona.velocityX = -8
coronaGroup.add(corona)
}


if(frameCount % 500 ===0){
floor = createSprite(1000,50,100,30)
  floor.addImage(floorImage)
  floor.scale = 0.2
    floor.velocityX = -7
    floor.lifetime = 800; 
   // floor.debug = true
    floor.setCollider("rectangle",0,0,1500,270)
   /* ghost.depth = floor.depth 
    ghost.depth  += 1 */
  /*  floor.y = Math.round(random(756,800))
  floorGroup.add(floor)  
 
}

// To display mask at random places
if(frameCount % 79===0){                  
  mask = createSprite(1000,random(427,850))
 mask.addImage(maskImg)
 mask.scale = 0.1
   mask.velocityX = -7
   //mask.x = floor.x
   mask.lifetime = 800;
   maskGroup.add(mask)
 }

// To display sanitizers at random places
if(frameCount % 843===0){
  sanitizer = createSprite(1000,(427,850))
  sanitizer.addImage(sanitizerImg)
  sanitizer.scale = 0.3
  sanitizer.velocityX = -7
  sanitizer.lifetime = 800
  sanitizerGroup.add(sanitizer)
}

// To display vaccine at random places
if(frameCount % 1009=== 0){
  vaccine = createSprite(1000,(835,851))
  vaccine.addImage(vaccineImg)
  vaccine.scale = 0.1
  vaccine.velocityX = -7
  vaccineGroup.add(vaccine)
}


if(frameCount % 555 === 0){
  protien = createSprite(1000,random(835,851))
  protien.addImage(protienImg)
  protien.scale = 0.4
  protien.velocityX = -7
  protienGroup.add(protien)
}


}

function Reset(){
  gameState = Play
  sMario.changeAnimation("running",sMario_running)
  reset.visible = false
  /*life = life - 1
  Protiens = Protiens - 1*/
 /* bgScreen2.velocityX = -5
  maskGroup.destroyEach()
  coronaGroup.destroyEach()
  sanitizerGroup.destroyEach()
  floorGroup.destroyEach()
  vaccineGroup.destroyEach();
  protienGroup.destroyEach();
  sMario.x = 200

}*/


