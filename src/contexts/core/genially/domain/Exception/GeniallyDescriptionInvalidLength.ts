export default class GenialyDescriptionInvalidLength extends Error {
    constructor(maxLength: number){
        super(`Genially description length must not exced ${maxLength} characters`);
    }
}