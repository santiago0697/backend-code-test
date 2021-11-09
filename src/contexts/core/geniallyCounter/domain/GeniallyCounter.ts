import { Document } from "bson";

export type GeniallyCounterPrimitives = {
    counter: number,
    modifiedAt: Date
};

export default class GeniallyCounter {
    public constructor(private _counter: number, private _modifiedAt: Date = new Date()) { }

    public get counter(): number {
        return this._counter;
    }

    public get modifiedAt(): Date {
        return this._modifiedAt;
    }

    public increaseCounter(): void {
        this._modifiedAt = new Date();
        this._counter++;
    }

    public toPrimitives(): GeniallyCounterPrimitives {
        return {
            counter: this.counter,
            modifiedAt: this.modifiedAt
        };
    }

    static fromPrimitives(geniallyCounterPrimitives: GeniallyCounterPrimitives): GeniallyCounter {
        return new GeniallyCounter(
            geniallyCounterPrimitives.counter,
            geniallyCounterPrimitives.modifiedAt
        );
    }

    static initializeCounter(): GeniallyCounter {
        return new GeniallyCounter(0);
    }
}