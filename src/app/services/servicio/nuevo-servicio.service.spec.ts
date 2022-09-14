import { TestBed } from '@angular/core/testing';

import { NuevoServicioService } from './nuevo-servicio.service';

describe('NuevoServicioService', () => {
  let service: NuevoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
