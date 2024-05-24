export class Cell{
    private alive: boolean;
    
    constructor(){
        this.alive = true;
    }
    public UpdateBasedOnNumberOfLivingNeightbours(numberOfNeightbours: number) {
    
        (numberOfNeightbours === 2 || numberOfNeightbours === 3)? this.alive = true 
                                                                : this.alive = false;

    }

    public isAlive(): boolean {
        return this.alive;
    }
}