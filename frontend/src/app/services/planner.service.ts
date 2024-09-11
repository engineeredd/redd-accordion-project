import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
	private apiUrl = 'http://localhost:3000/api';
  private apiPlannersUrl = 'http://localhost:3000/api/planners';

  constructor(private http: HttpClient) {}

  // Fetch all planners
  getPlanners(): Observable<any> {
    return this.http.get<any>(this.apiPlannersUrl);
  }

  // Fetch a single planner by ID
  getPlannerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPlannersUrl}/${id}`);
  }

  // Create a new planner
  createPlanner(plannerData: any): Observable<any> {
    return this.http.post<any>(this.apiPlannersUrl, plannerData);
  }

  // Update an existing planner
  updatePlanner(id: number, plannerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiPlannersUrl}/${id}`, plannerData);
  }

  // Delete a planner
  deletePlanner(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPlannersUrl}/${id}`);
  }

	// Get all funds
  getAllFunds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPlannersUrl}/dropdown/funds`);
  }

  // Get all sources
  getAllSources(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPlannersUrl}/dropdown/sources`);
  }

  // Get all runs
  getAllRuns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPlannersUrl}/dropdown/runs`);
  }

  // Get all reports
  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPlannersUrl}/dropdown/reports`);
  }

  // Fetch external system configs for dropdown
  getExternalSystemConfigs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/external-systems`);
  }
}