import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getList(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('count', size.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getId(name: string, status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?name=${name}&status=${status}`);
  }

  post(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  put(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
}
