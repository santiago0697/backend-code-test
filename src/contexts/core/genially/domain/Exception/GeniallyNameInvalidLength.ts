export default class GeniallyNameInvalidLength extends Error {
    constructor(minLength:number, maxLength: number){
        super(`Genially name length must be between ${minLength} ${maxLength} characters`);
    }
}