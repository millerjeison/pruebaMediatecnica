import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Repo } from '../models/repo.model';

@Injectable({
  providedIn: 'root'
})
export class ConeccionGitService {
  URL_ORIGINAL = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  
  getRepos(user: string): Observable<Repo[]> {
    const REPOSITORIOS_URL = `/users/${user}/repos`;
    return this.http.get<Repo[]>(this.URL_ORIGINAL + REPOSITORIOS_URL);
  }
}
