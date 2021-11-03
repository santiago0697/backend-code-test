import GeniallyNameInvalidLength from "../Exception/GeniallyNameInvalidLength";

const MAX_LENGTH = 20;
const MIN_LENGTH = 3;

export default class GeniallyName {
    constructor(private _value: string) {
    }

    public static create(name: string): GeniallyName {
        const geniallyName = new GeniallyName(name);
        geniallyName.validate();
        return geniallyName;
    }

    protected validate(): void {
        if (this._value.length < MIN_LENGTH || this._value.length > MAX_LENGTH) {
            throw new GeniallyNameInvalidLength(MIN_LENGTH, MAX_LENGTH);
        }
    }

    public get value(): string {
        return this._value;
    }
}