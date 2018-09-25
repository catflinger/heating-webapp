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
            const status: SystemStatus = data;

            expect(status).toBeDefined;
            expect(status.control.water).toEqual(true);
            expect(status.control.heating).toEqual(false);

            expect(status.env.hwTemp).toEqual(45);

            expect(status.program.slotsPerDay).toEqual(10);
            expect(status.program.slots[0]).toEqual(true);
            expect(status.program.slots[3]).toEqual(false);
            expect(status.program.slots[9]).toEqual(true);

            expect(status.program.minHWTemp).toEqual(40);
            expect(status.program.maxHWTemp).toEqual(50);
        });
    }));
});
