import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowReleaseService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://192.168.9.47:3116";
  // private baseUrl = "http://192.168.9.47:3116";

  getFlowReleaseOCI1: any = () => {
    return this.http.get(`${this.baseUrl}/flow-release/flow-release-oci1`);
  }

  getFlowReleaseOCI2: any = () => {
    return this.http.get(`${this.baseUrl}/flow-release/flow-release-oci2`);
  }

  getFlowReleaseFSB: any = () => {
    return this.http.get(`${this.baseUrl}/flow-release/flow-release-fsb`);
  }

  grafikRelease: any = (start: any, end: any) => {
    return this.http.post(`${this.baseUrl}/flow-release/grafik-flow-release`, {startDate: start, endDate: end});
  }

}
