import { TestBed } from '@angular/core/testing';

import { SaveToCookieService } from './save-to-cookie.service';

describe('SaveToCookieService', () => {
  let service: SaveToCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveToCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
