class Bird{
    constructor(x,y,w,h,t){
        this.vel = 20
        this.x = x
        this.y = y
        this.body = createSprite(x,y,w,h)
        this.tipe = t
    }

    fly(){
        if(this.tipe == 1){
            this.x += this.vel
        }else{
            if(this.tipe == 2){
                this.x -= this.vel
            }
        }
    }

    save(){
        let pos = this.body.position
        pos.x = this.x
        pos.y = this.y
    }

    
}