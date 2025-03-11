import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('count', size.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }
}
