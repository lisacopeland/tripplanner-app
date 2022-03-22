import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../common/constants';
import { TripDetail } from '../models/trip-details.model';

export interface TripDetailResponse {
  data: TripDetail[];
  itemCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripDetailsService {
  constructor(@Inject(API_URL) public apiUrl, private http: HttpClient) {}

  query(aid:string, tripId, search: Partial<TripDetail>): Observable<TripDetail[]> {
    const searchObject: any = search;
    const url = `${this.apiUrl}/trips/${aid}/${tripId}/tripdetails`;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<TripDetail[]>(url, { params });
  }

  create(aid: string, tripId: string, tripDetail: TripDetail): Observable<TripDetail> {
    const url = `${this.apiUrl}/trips/${aid}/${tripId}/tripdetails`;
    return this.http.post<TripDetail>(url, tripDetail);
  }

  update(aid: string, tripId: string, tripDetail: TripDetail): Observable<TripDetail> {
    const url = `${this.apiUrl}/trips/${aid}/${tripId}/tripdetails/${tripDetail.id}`;
    return this.http.put<TripDetail>(url, tripDetail);
  }

  delete(aid: string, tripId: string, tripDetailId: string): Observable<TripDetail> {
    const url = `${this.apiUrl}/trips/${aid}/${tripId}/tripdetails/${tripDetailId}`;
    return this.http.delete<TripDetail>(url);
  }
}
