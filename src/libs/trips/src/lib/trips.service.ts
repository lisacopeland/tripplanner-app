import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './trips.model';
import { API_URL } from '@tripplanner/common';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface TripResponse {
  data: Trip[];
  itemCount: number;
}

@Injectable()
export class TripService {
  constructor(@Inject(API_URL) public apiUrl, private http: HttpClient) {}
  url = `${this.apiUrl}/trips`;

  query(search: Partial<Trip>): Observable<Trip[]> {
    const searchObject: any = search;
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<Trip[]>(this.url, { params });
  }

  create(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, trip);
  }

  update(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${trip.id}`, trip);
  }

  delete(id: string): Observable<Trip> {
    return this.http.delete<Trip>(`${this.url}/${id}`);
  }
}
