import { TestBed, inject } from '@angular/core/testing';

import { TownsService } from './towns.service';

describe('TownsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TownsService]
    });
  });

  it('should be created', inject([TownsService], (service: TownsService) => {
    expect(service).toBeTruthy();
  }));
});
