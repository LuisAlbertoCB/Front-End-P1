import { TestBed } from '@angular/core/testing';

import { VerServicioService } from './ver-servicio.service';

describe('VerServicioService', () => {
  let service: VerServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
