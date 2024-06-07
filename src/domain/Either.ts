export abstract class Either<TError, TSuccess> {
    protected constructor(
        protected _value: TSuccess | null,
        protected error: TError | null
    ) {    }

    static createRight<TError, TSuccess>(value: TSuccess) {
        return Right.create<TError, TSuccess>(value)
    }

    static createLeft<TError, TSuccess>(error: TError) {
        return Left.create<TError, TSuccess>(error)
    }
}

export class Right<TError, OriginalT> extends Either<TError, OriginalT> {
    private constructor(value: OriginalT) {
        super(value, null)
    }

    public map<NewT>(func: (value: OriginalT) => NewT) : Right<TError, NewT> {
        const result = func(this._value!)
        return Either.createRight<TError, NewT>(result)
    }

    public fold<TResult>(
        onSuccess: (value: OriginalT) => TResult, 
        onError: (error: TError) => TResult) : TResult {
        return onSuccess(this._value!)
    }

    public static create<TError, TSuccess>(value: TSuccess) {
        return new Right<TError, TSuccess>(value)
    }
}

export class Left<TError, TSuccess> extends Either<TError, TSuccess> {
    private constructor(error: TError) {
        super(null, error)
    }

    public map<TNewError>(func: (name: TError) => TNewError) : Left<TNewError, TSuccess> {
        const result = func(this.error!)
        return Either.createLeft<TNewError, TSuccess>(result)
    }

    public fold<TResult>(
        onSuccess: (value: TSuccess) => TResult, 
        onError: (error: TError) => TResult) {
        return onError(this.error!)
    }

    public static create<TError, TSuccess>(value: TError) {
        return new Left<TError, TSuccess>(value)
    }
}