import GeniallyDescription from "./ValueObject/GeniallyDescription";
import GeniallyName from "./ValueObject/GeniallyName";

export default class Genially {
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(
    private _id: string,
    private _name: GeniallyName,
    private _description?: GeniallyDescription,
    private _createdAt?: Date
  ) {}

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

  public static create(id: string, name: GeniallyName, description: GeniallyDescription): Genially {
    return new Genially(id, name, description, new Date());
  }
}
