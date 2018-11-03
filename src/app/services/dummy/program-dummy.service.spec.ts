import { TestBed, inject } from '@angular/core/testing';

import { ProgramDummyService } from './program-dummy.service';

describe('ProgramDummyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramDummyService]
    });
  });

  it('should be created', inject([ProgramDummyService], (service: ProgramDummyService) => {
    expect(service).toBeTruthy();
  }));
});
