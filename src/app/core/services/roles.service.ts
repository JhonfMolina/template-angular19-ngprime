import { Injectable } from '@angular/core';
import { Roles } from '../interfaces/roles.interfaces';
import {
  PaginatedApiResponse,
  ApiResponse,
} from '../interfaces/util/response.models';
import { GlobalService } from './util/global.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends GlobalService {
  getlist(params: any) {
    return this._http.get<PaginatedApiResponse<Roles>>(
      `${this.apiUrl}/seguridad/roles/index-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public getById(params: any) {
    return this._http.get<ApiResponse<Roles>>(
      `${this.apiUrl}/seguridad/roles/search-where`,
      {
        params: this.setHttpParams(params),
      }
    );
  }

  public post(data: Roles) {
    return this._http.post<ApiResponse<Roles>>(
      `${this.apiUrl}/seguridad/roles`,
      data
    );
  }

  public put(id: string, data: Roles) {
    return this._http.put<ApiResponse<Roles>>(
      `${this.apiUrl}/seguridad/roles/${id}`,
      data
    );
  }
}
