import { Injectable } from '@angular/core';
import { IProgramService } from '../common/injectables';
import { Observable } from 'rxjs';
import { Program } from '../common/program';

@Injectable()
export class ProgramService implements IProgramService {
    
    public list(): Observable<Program[]> {
        throw new Error("Method not implemented.");
    }

  constructor() { }
}
