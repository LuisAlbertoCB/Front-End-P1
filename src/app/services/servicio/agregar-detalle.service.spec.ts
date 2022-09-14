import { TestBed } from '@angular/core/testing';

import { AgregarDetalleService } from './agregar-detalle.service';

describe('AgregarDetalleService', () => {
  let service: AgregarDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
