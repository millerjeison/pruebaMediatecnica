import { TestBed } from '@angular/core/testing';

import { ConeccionGitService } from './coneccion-git.service';

describe('ConeccionGitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConeccionGitService = TestBed.get(ConeccionGitService);
    expect(service).toBeTruthy();
  });
});
