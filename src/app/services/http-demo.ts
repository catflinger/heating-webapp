import { Observable } from "rxjs";

export class HttpDemo {

    public get(url: string): Observable<string> {
        return Observable.of<string>('{"result":"OK"}');
    }

    public post(): Observable<string> {
        return Observable.of<string>('{"result":"OK"}');
    }

    private mapGetResponse(url: string): string {
        const prefix = "^https?://[a-zA-Z0-9.](:\d+)?/api/";
        //status response
        let exp =   new RegExp(prefix + "status");
        
        return "hello";
    }
}