import { TestBed } from '@angular/core/testing';

import { JwtAuthService } from './jwt-auth-service.service';

describe('JwtAuthServiceService', () => {
  let service: JwtAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
