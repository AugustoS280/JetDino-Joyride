class Evil{
    constructor(x,y,w,h,t){
        this.vel = 10
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.type = t
        this.body = createSprite(x,y,w,h)
    }


    chase(){
        if(this.type == 1){
            this.x += this.vel
        }else{
            if(this.type == 2){
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