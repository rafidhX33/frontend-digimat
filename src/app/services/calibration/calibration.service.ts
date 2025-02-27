import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalibrationService {

  constructor(private http: HttpClient) { }

  // private baseUrl = "http://localhost:3116";
  private baseUrl = "http://192.168.9.47:3116";

  getAllPendingTask: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/table-pending`);
  }

  getCountTransaksiTipe: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transaksi_tipe`);
  }

  getCountTransaksiByYear: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transaksi_by_year`);
  }

  getCountTransaksiByMonth: any = (year: any) => {
    return this.http.post(`${this.baseUrl}/calibration/count_transaksi_by_month`, {year: year});
  }

  getTransaksiByStatus: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/transaksi_by_status`);
  }

  getTransaksiByCategory: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/transaksi_by_category`);
  }

  filterTransaksiMonth: any = (month: any) => {
    return this.http.post(`${this.baseUrl}/calibration/filter_transksi_month`, {month: month});
  }

  getCountTransJenisMonthly: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transjenis_monthly`);
  }

  getCountTransRegMonthly: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transreg_monthly`);
  }

  getCountTransJenisYearly: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transjenis_yearly`);
  }

  getCountTransRegYearly: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/count_transreg_yearly`);
  }

  getMonthTrans: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/month_trans`);
  }

  getYearTrans: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/year_trans`);
  }

  getAllTrans: any = () => {
    return this.http.get(`${this.baseUrl}/calibration/getTrans`);
  }

  cetakKalibrasi: any = (id: any) => {
    return this.http.get(`${this.baseUrl}/calibration/cetak-kalibrasi/${id}`);
  }

}
