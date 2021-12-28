import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.apiUrl;
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseUrl + 'Requests');
  }

  getRequest(id): Observable<Request> {
    return this.http.get<Request>(this.baseUrl + 'Requests/' + id);
  }

  createRequest(request: any) {
    return this.http.post(this.baseUrl + 'Requests', request);
  }

}
