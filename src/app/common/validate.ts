export class Validate {


    static isString(val: any, msg: string): string {
        if (typeof val !== "string" || !val) {
            throw new Error("invalid string data " + msg);
        }
        return val;
    }
    static isBoolean(val: any, msg: string): boolean {
        if (typeof val !== "boolean") {
            throw new Error("invalid boolean data " + msg);
        }
        return val;
    }

    static isNumber(val: any, msg: string): number {
        if (typeof val === "number") {
            return val;
        } else if (typeof val === "string") {
            const result = Number.parseFloat(val);
            if (!isNaN(result)) {
                return result;
            } 
        }
        throw new Error("invalid numeric data " + msg);
    }

    static asInteger(val: any, msg: string): number {
        if (typeof val !== 'number' ||
            !isFinite(val) ||
            Math.floor(val) !== val) {
            throw new Error("invalid numeric data " + msg);
        }
        return val;
    }
}

