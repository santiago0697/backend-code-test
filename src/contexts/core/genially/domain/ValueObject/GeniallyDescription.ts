import GeniallyDescriptionInvalidLength from "../Exception/GeniallyDescriptionInvalidLength";

const MAX_LENGTH = 125;

export default class GeniallyDescription {
    constructor(private _value: string) {
    }

    public static create(description: string): GeniallyDescription {
        const geniallyDescription = new GeniallyDescription(description);
        geniallyDescription.validate();
        return geniallyDescription;
    }

    protected validate() {
        if (this._value.length > MAX_LENGTH) {
            throw new GeniallyDescriptionInvalidLength(MAX_LENGTH);
        }
    }

    public get value(): string {
        return this._value;
    }
}