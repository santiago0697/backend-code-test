import GeniallyDescription from "./ValueObject/GeniallyDescription";
import GeniallyName from "./ValueObject/GeniallyName";

export type GeniallyPrimitives = {
  id: string,
  name: string,
  description?: string,
  createdAt?: Date,
  modifiedAt?: Date,
  deletedAt?: Date,
}

export default class Genially {
  constructor(
    private _id: string,
    private _name: GeniallyName,
    private _description?: GeniallyDescription,
    private _createdAt?: Date,
    private _modifiedAt?: Date,
    private _deletedAt?: Date,
  ) { }

  get id(): string {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription | undefined {
    return this._description;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get modifiedAt(): Date | undefined {
    return this._modifiedAt;
  }

  get deletedAt(): Date | undefined {
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

  public toPrimitives(): GeniallyPrimitives {
    return {
      id: this.id,
      name: this.name.value,
      description: this.description.value,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      deletedAt: this.deletedAt,
    }
  }

  public static buildFromPrimitives(primitives: GeniallyPrimitives) {
    return new Genially(
      primitives.id,
      new GeniallyName(primitives.name),
      new GeniallyDescription(primitives.description),
      primitives.createdAt,
      primitives.modifiedAt,
      primitives.deletedAt
    );
  }
}
