export default abstract class ValueObject {

    constructor(private _value: string) {
    }

    protected abstract validate(): void;

    public get value(): string {
        return this._value;
    }
}