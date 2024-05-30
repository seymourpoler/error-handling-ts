import { Either, Left, Right } from '../../src/domain/Either';

describe('Either should', () => {
    describe('Either right', () =>{
        test('create right either', () =>{
            const right = Either.createRight("value");
            expect(right).toEqual(expect.any(Right));
        }) 
        test('map right', () => {
            const right = Either.createRight("Carlos");
            const result = right.map<User>(createUser)
            expect(result).toEqual(expect.any(Right<CurrentError,User>));
        })
    
        function createUser(name: string) : User{
            return new User(name);
        }

        test('fold right', () => {
            const name = "Carlos"
            const right = Either.createRight(name);
            const result = right.fold<string>(
                value => {expect(value).toBe(name); return value},
                error => {throw new Error("it is not expected")}
            );
            expect(result).toBe(name)
        })
    })

    describe('Either left', () =>{
        test('create left either', () =>{
            const left = Either.createLeft(new Error("Cannot save user"));
            expect(left).toEqual(expect.any(Left));
        })

        test('map left', ()=> {
            const left = Either.createLeft(new Error("Cannot save user"));
            const result = left.map<CurrentError>(createError)
            expect(result).toEqual(expect.any(Left<CurrentError, User>));
        })
        
        function createError(error: Error) : CurrentError{
            return new CurrentError(error.message);
        }
    
        test('fold left', () => {
            const appError = new Error("Cannot save user");
            const left = Either.createLeft(appError);
            const result = left.fold<string>(
                value => {throw new Error("it is not expected")},
                error => {expect(error).toBe(appError); return error.toString()}
            );
            expect(result).toBe(appError.toString())
        })
    })    
})

class User{
    private name : string

    constructor(name: string){
        this.name = name
    }
}

class CurrentError{
    private message : string;

    constructor(message : string){
        this.message = message;
    }
}