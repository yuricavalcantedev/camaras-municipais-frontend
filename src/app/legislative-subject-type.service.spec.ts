import { TestBed } from '@angular/core/testing';

import { LegislativeSubjectTypeService } from './legislative-subject-type.service';

describe('LegislativeSubjectTypeService', () => {
  let service: LegislativeSubjectTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislativeSubjectTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
