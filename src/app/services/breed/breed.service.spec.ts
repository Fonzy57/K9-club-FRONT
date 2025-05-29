import { TestBed } from '@angular/core/testing';

import { BreedServiceService } from './breed.service';

describe('BreedServiceService', () => {
  let service: BreedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
