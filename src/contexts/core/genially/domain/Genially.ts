import GeniallyDescription from "./ValueObject/GeniallyDescription";
import GeniallyName from "./ValueObject/GeniallyName";

export default class Genially {
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(
    private _id: string,
    private _name: GeniallyName,
    private _description?: GeniallyDescription
  ) {
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription | undefined {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  public delete(): void {
    this._deletedAt = new Date();
  }

  public rename(name: GeniallyName): void {
    this._modifiedAt = new Date();
    this._name = name;
  }
}
