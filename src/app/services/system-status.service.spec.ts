import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SystemStatus } from "../common/system-status";
import { SystemStatusService } from './system-status.service';

describe('SystemStatusService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                SystemStatusService,
                { provide: XHRBackend, useClass: MockBackend }]
        });
    });

    it('should inject', inject([SystemStatusService], (service: SystemStatusService) => {
        expect(service).toBeTruthy();
    }));

    it("should return summary info", inject([SystemStatusService], (service: SystemStatusService) => {
        service.getStatus().subscribe((data) => {
            expect(data).toBeDefined;
            expect(data.control.water).toEqual(true);
            expect(data.control.heating).toEqual(false);
        });
    }));
});
