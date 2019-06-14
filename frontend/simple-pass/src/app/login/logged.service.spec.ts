import { TestBed } from '@angular/core/testing';

import { LoggedService } from './logged.service';

describe('LoggedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedService = TestBed.get(LoggedService);
    expect(service).toBeTruthy();
  });
});
