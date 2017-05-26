export class Validate {
    static isBoolean(val: any, msg: string): boolean {
        if (typeof val !== "boolean") {
            throw new Error("invalid boolean data " + msg);
        }
        return val;
    }

    static isNumber(val: any, msg: string): number {
        if (typeof val !== "number") {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    }

    static isInteger(val: any, msg: string): number {
        if (typeof val !== 'number' ||
            !isFinite(val) ||
            Math.floor(val) !== val) {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    }
}

