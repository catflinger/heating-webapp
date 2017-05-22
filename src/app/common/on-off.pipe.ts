import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onOff'
})
export class OnOffPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (typeof value === "boolean") {
            return value ? "ON" : "OFF";
        }
        return value;
    }

}
