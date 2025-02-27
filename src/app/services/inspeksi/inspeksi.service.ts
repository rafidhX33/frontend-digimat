import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspeksiService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:3116";
  //private baseUrl = "http://192.168.9.47:3116";

  getAllReasonFSB: any = () => {
    return this.http.get(`${this.baseUrl}/inspeksi/reasonFSB`);
  }

  getAllProdcutFSB: any = () => {
    return this.http.get(`${this.baseUrl}/inspeksi/productFSB`);
  }

  getRejectionFSB: any = (start: any, end: any) => {
    return this.http.post(`${this.baseUrl}/inspeksi/rejectionFSB`, {startDate: start, endDate: end});
  }

  getRejectionOCI1: any = (start: any, end: any) => {
    return this.http.post(`${this.baseUrl}/inspeksi/rejectionOCI1`, {startDate: start, endDate: end});
  }

  getRejectionOCI2: any = (start: any, end: any) => {
    return this.http.post(`${this.baseUrl}/inspeksi/rejectionOCI2`, {startDate: start, endDate: end});
  }


}
