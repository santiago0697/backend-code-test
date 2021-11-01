import GeniallyName from "./ValueObject/GeniallyName";

export default class Genially {
  private _id: string;
  private _name: GeniallyName;
  private _description: string;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(id: string, name: GeniallyName, description?: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): string {
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
}
