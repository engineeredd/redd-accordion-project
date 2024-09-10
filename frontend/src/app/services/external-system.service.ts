import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalSystemService {
  private apiUrl = 'http://localhost:3000/api/external-systems'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  // Get all external systems
  getSystems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Create a new external system
  createSystem(system: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, system);
  }

  // Update an external system
  updateSystem(id: number, system: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, system);
  }

  // Delete an external system
  deleteSystem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Search for external systems by name
  searchSystems(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?name=${name}`);
  }
}
