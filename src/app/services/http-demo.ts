import { Observable } from "rxjs";
import { UrlHandlingStrategy } from "@angular/router/src/url_handling_strategy";

import * as Fs from "fs";
import * as Path from "path";

export class HttpDemo {

    public get(url: string): Observable<string> {
        return Observable.of<string>('{"result":"OK"}');
    }

    public post(): Observable<string> {
        return Observable.of<string>('{"result":"OK"}');
    }

    private mapGetResponse(url: string): string {
        const prefix = "^https?://[a-zA-Z0-9.](:\d+)?/api/";
        
        // status response
        let exp = new RegExp(prefix + "status");
        
        if (exp.test(url)) {
            return Fs.readFileSync(
                Path.join(__dirname, "assets", "data", "status.json"),
                "utf8");
        }

        // program list response
        exp = new RegExp(prefix + "program");
        
        if (exp.test(url)) {
            return Fs.readFileSync(
                Path.join(__dirname, "assets", "data", "programs.json"),
                "utf8");
        }

        // program response for id= cf1f515c-7915-49d1-be4b-6c245ed6b255
        exp = new RegExp(prefix + "program/[a-z0-9-]{36}");
        
        if (exp.test(url)) {
            return Fs.readFileSync(
                Path.join(__dirname, "assets", "data", "program.json"),
                "utf8");
        }

    }

    private statusResponse: any = 
}