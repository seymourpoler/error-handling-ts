import{ Cell } from './Cell'

describe('cell should', ()=>{
    
    let cell: Cell

    beforeEach(()=>{
        cell = new Cell();
    })

    describe('when created', ()=>{
        it('be alive', ()=>{
            expect(cell.isAlive()).toBeTruthy();
        });
    });

    describe('when has only one neightbour lives', ()=>{
        it('dead', ()=>{
            const numberOfNeightbours  = 1;

            cell.UpdateBasedOnNumberOfLivingNeightbours(numberOfNeightbours);
            
            expect(cell.isAlive()).toBeFalsy();
        });
    });

    describe('when has two neightbour live', ()=>{
        it('dead', ()=>{
            const numberOfNeightbours  = 2;
            
            cell.UpdateBasedOnNumberOfLivingNeightbours(numberOfNeightbours);
            
            expect(cell.isAlive()).toBeTruthy();
        });
    });

    it('line of life of a cell', ()=>{
        cell.UpdateBasedOnNumberOfLivingNeightbours(0);
        expect(cell.isAlive()).toBeFalsy();

        cell.UpdateBasedOnNumberOfLivingNeightbours(3);
        expect(cell.isAlive()).toBeTruthy();
    })

    describe('when has four neightbours live', ()=>{
        it('dead', ()=>{
            const numberOfNeightbours  = 4;
            
            cell.UpdateBasedOnNumberOfLivingNeightbours(numberOfNeightbours);
            
            expect(cell.isAlive()).toBeFalsy();
        });
    });
});

