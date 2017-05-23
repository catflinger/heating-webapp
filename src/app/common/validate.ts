export class Validate {
    static isBoolean(val: any): boolean {
        if (typeof val !== "boolean") {
            throw new Error("invalid boolean data")
        }
        return val;
    }

    static isNumber(val: any): number {
        if (typeof val !== "number") {
            throw new Error("invalid numeric data")
        }
        return val;
    }

    static isInteger(val: any): number {
        if (typeof val !== 'number' ||
            !isFinite(val) ||
            Math.floor(val) !== val) {
            throw new Error("invalid numeric data")
        }
        return val;
    }
}

