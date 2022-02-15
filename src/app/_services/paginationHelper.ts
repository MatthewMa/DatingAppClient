import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from "../_models/pagination.model";

export function getPaginaterResult<T>(url: string, params: HttpParams, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult();
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

export function setParams(pageNumber: number, pageSize: number) {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());
  return params;
}


