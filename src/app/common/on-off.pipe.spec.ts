import { OnOffPipe } from './on-off.pipe';

describe('OnOffPipe', () => {
    it('create an instance', () => {
        const pipe = new OnOffPipe();
        expect(pipe).toBeTruthy();
    });

    it("should convert boolean to ON OFF", () => {
        const pipe = new OnOffPipe();
        expect(pipe.transform(true)).toEqual("ON");
        expect(pipe.transform(false)).toEqual("OFF");
    });

    it("should pass through non-boolean values unchanged", () => {
        const pipe = new OnOffPipe();
        expect(pipe.transform(undefined)).toBeUndefined;
        expect(pipe.transform(null)).toBeNull;
        expect(typeof pipe.transform({})).toEqual("object");
        expect(pipe.transform(45)).toEqual(45);
        expect(pipe.transform("45")).toEqual("45");
    });
});
