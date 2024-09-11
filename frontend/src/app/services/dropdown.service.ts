// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DropdownService {

//   private apiUrl = 'http://localhost:3000/api/dropdown';

//   constructor(private http: HttpClient) {}

//   getFunds(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/funds`);
//   }

//   getFundAliases(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/fund-aliases`);
//   }

//   getSources(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/sources`);
//   }

//   getRuns(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/runs`);
//   }

//   getReportTypes(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/report-types`);
//   }

//   getReportNames(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/report-names`);
//   }
// }