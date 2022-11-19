var hack
var angle,AA,AV
var dino, test
var bullet, bullets = []
var enemy, enemys = [] 
var asteroid, asteroids = [], asteroidSData, asteroidSSheet, asteroidAnim = []
var bird, birds = []
var gamestate = 1, hit = false
var Hp = 180, lifeBarBG

function preload(){
  asteroidSData = loadJSON("./Assets/Asteroids/asteroid.json")
  asteroidSSheet = loadImage("./Assets/Asteroids/Asteroide.png")
}
function setup() 
{
  //rectMode(CENTER)
  createCanvas(windowWidth, windowHeight);
  dino = createSprite(width/2, height-200)
}

function draw(){

  background(255);
  
  if(gamestate == 1){
  play()
  }

  /*else{
    if(dino.y >= height - 200 && !test){
      dino.velocityY = 0
    }
  }*/
  
}

function keyPressed(){
  if(keyCode === 38 || keyCode === 87){
    dino.velocityY = -20
  }

  if(keyCode === 68 || keyCode === 39){
    bullet = new Projectil(dino.x,dino.y,10,10,2,30)
    bullets.push(bullet)
  }

  if(keyCode === 65 || keyCode === 37){
    bullet = new Projectil(dino.x,dino.y,10,10,1,30)
    bullets.push(bullet)
  }

}

function mouseReleased(){

}

function play(){
  if(dino.velocityY < 30){
    dino.velocityY +=1
  }

  setBirds()

  //set all asteroids functions from class
  /*if(asteroids.length > 0){
    for(let i = asteroids.length -1; i > -1; i--){

    }
  }
  //ser all bullets functions from class
  
  
  }*/
  //set all enemys functions from class
  /*if(asteroids.length>0){
    for(let i = asteroids.length-1;i>-1;i--){
      asteroids[i].animate()
      asteroids[i].display()
    }
  }*/
  Destroy_n_set_Enemys()
  setBullets()


  AerodactylSpawn()
  AsteroidlSpawn()
  birdsSpawn()
  
  checkAllHit()
  healthBar()
  drawSprites()
  Destroy_n_set_Asteroids()
  AnimationA()
  //HPdown()
}



function checkAllHit(){
  checkHitE()
  checkHitB()
  checkHitA()

  killAll()
}

function checkHitE(){
  for(let a = enemys.length -1; a>-1; a--){
    if(dino.overlap(enemys[a].body)){
      enemys[a].body.destroy()
      enemys.splice(a,1)
      hit = true
    }
  }
}
function checkHitA(){
  for(let a = asteroids.length -1; a>-1; a--){
    if(dino.overlap(asteroids[a].body)){
      asteroids[a].body.destroy()
      asteroids.splice(a,1)
      hit = true
    }
  }
}
function checkHitB(){
  for(let a = birds.length -1; a>-1; a--){
    if(dino.overlap(birds[a].body)){
      birds[a].body.destroy()
      birds.splice(a,1)
      hit = true
    }
  }
}





function killAll(){
  if(hit){
    Hp -= 180/3
    killB()
    killE()
    killA()
    hit = false
  }
}

function killB(){
  if(birds.length !== 0){
    for(let i = birds.length-1; i >-1; i--){
      let Bbody = birds[i].body
      Bbody.destroy()
      birds.pop()
    }
  }
}
function killE(){
  if(enemys.length !== 0){
    for(let i = enemys.length-1; i >-1; i--){
      let Ebody = enemys[i].body
      Ebody.destroy()
      enemys.pop()
    }
  }
}
function killA(){
  if(asteroids.length !== 0){
    for(let i = asteroids.length-1; i >-1; i--){
      let Abody = asteroids[i].body
      Abody.destroy()
      asteroids.pop()
    }
  }
}





function healthBar(){
  fill("white")
  rect(30,30,180,50)
  
  if(Hp !== 0){
    fill("red")
    rect(30,30,Hp,50)
  }
  
}




function AsteroidlSpawn(){
  if(frameCount % 80 === 0&& frameCount !== 0){
    let x = -50
    asteroid = new Projectil(x,0,240,160,0,10,asteroidAnim,dino.x,dino.y,1)
    asteroids.push(asteroid)
  }
}
function birdsSpawn(){
  if(frameCount % 30 === 0 && frameCount !== 0){
  let Rn = Math.round(random(1,2))
  if(Rn == 1){
    let x = -50
    let Rny = Math.round(random(0,height))
    bird = new Bird(x,Rny,100,30,Rn)
    birds.push(bird)
  }else{
    if(Rn == 2){
      let x = width +50
      let Rny = Math.round(random(0,height))
      bird = new Bird(x,Rny,100,30,Rn)
      birds.push(bird)
    }
  }

  }
}
function AerodactylSpawn(){
  if(frameCount % 30 === 0 && frameCount !== 0){
    let Rn = Math.round(random(1,2))
    if(Rn == 1){
      let x = -50
      let Rny = Math.round(random(0,height))
      enemy = new Evil(x,Rny,100,100,1)
      enemys.push(enemy)
    }else{
      if(Rn == 2){
        let x = width +50
        let Rny = Math.round(random(0,height))
        enemy = new Evil(x,Rny,100,100,2)
        enemys.push(enemy)
      }
    }
  }
}


function Destroy_n_set_Enemys(){
  if(enemys.length>0){
    for(let i = enemys.length-1;i>-1;i--){
      enemys[i].chase()
      enemys[i].save()
      //check colision(overlap) from bullets and enemys, to kill them
      for(let a = bullets.length - 1; a > -1 ; a--){
        if(bullets[a] !== undefined && enemys[i] !== undefined)
        if(bullets[a].body.overlap(enemys[i].body)){
          bullets[a].body.destroy()
          bullets.splice(a,1)

          enemys[i].body.destroy()
          enemys.splice(i,1)
        }
      }
    }
  }
}
function Destroy_n_set_Asteroids(){
  if(asteroids.length>0){
    for(let i = asteroids.length-1;i>-1;i--){
      setAsteroids(i)
      //check colision(overlap) from bullets and enemys, to kill them
      for(let a = bullets.length - 1; a > -1 ; a--){
        if(bullets[a] !== undefined && asteroids[i] !== undefined)
        if(bullets[a].body.overlap(asteroids[i].body)){
          bullets[a].body.destroy()
          bullets.splice(a,1)

          asteroids[i].life -= 1
          if(asteroids[i].life <=0){
            asteroids[i].body.destroy()
            asteroids.splice(i,1)
          }
        }
      }
    }
  }
}
function setBullets(){
  if(bullets.length > 0){
    for(let i = bullets.length - 1; i > -1 ; i--){
      bullets[i].move()
      bullets[i].save()
    }
  }

}
function setAsteroids(i){

  asteroids[i].fall()
  asteroids[i].save()
  asteroids[i].animate()
  asteroids[i].display()
}
function setBirds(){
  if(birds.length > 0){
    for(let i = birds.length -1; i > -1; i--){
      birds[i].fly()
      birds[i].save()
    }
  }
}



function AnimationA(){
  var asteroidFrames = asteroidSData.frames;
  for (var i = 0; i < asteroidFrames.length; i++) {
    var pos = asteroidFrames[i].position;
    var img = asteroidSSheet.get(pos.x, pos.y, pos.w, pos.h);
    asteroidAnim.push(img);
  }
}