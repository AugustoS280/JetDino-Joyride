class Projectil{

    constructor(x,y,w,h,t,v,Anim,Dx,Dy,a){
        this.animation = Anim
        this.AnimSpeed = 0.05
        this.vel = v
        this.IsAsteroid = a
        this.type = t
        this.width = w
        this.height = h
        this.dir = createVector(Dx-x,Dy-y)
        this.x = x
        this.y = y
        this.body = createSprite(x,y,w,h)
        if(a == 1){
            this.life = 3
        }
    }

    animate(){
        this.AnimSpeed += 0.05
    }


    move(){
        if(this.type == 1){
            this.x -= this.vel
        }else{
            if(this.type == 2){
                this.x += this.vel
            }
        }
    }
    
    save(){
        let pos = this.body.position
        pos.x = this.x
        pos.y = this.y
    }
    
    fall(){
        if(this.IsAsteroid == 1){
            this.dir.normalize()
            this.x += this.dir.x*this.vel
            this.y += this.dir.y*this.vel
        }
    }

    display() {
        var pos = this.body.position;
        var index = floor(this.AnimSpeed % this.animation.length);
        this.body.visible = false
        
        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.animation[index], 0, 0, this.width, this.height);
        pop();
      }
}