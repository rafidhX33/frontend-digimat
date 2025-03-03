import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

/** Struktur data Supplier dari API /api/suppliers */
interface Supplier {
  kode_vendor: string;
  name_vendor: string;
}

/** Struktur data yang akan dikirim ke /api/supplier-info */
interface SupplierInfo {
  kode_vendor: string;
  status: string;
  logo?: string;
}

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class SupplierInfoComponent implements OnInit {
  /** Data supplier yang diambil dari endpoint /api/suppliers */
  suppliers: Supplier[] = [];

  /** Opsi status yang tersedia */
  statusOptions = [
    { label: 'Single', value: 'single' },
    { label: 'Non-Single', value: 'non-single' }
  ];

  /** Data yang akan dikirim ke backend */
  supplier: SupplierInfo = {
    kode_vendor: '',
    status: ''
  };

  /** File logo yang dipilih */
  selectedFile: File | null = null;

  /** API base URL (sesuaikan dengan backend Anda) */
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  /** Ambil daftar supplier dari endpoint /api/suppliers */
  loadSuppliers(): void {
    this.http.get<any>(`${this.apiUrl}/api/suppliers`).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.suppliers = response.data;
          console.log('Suppliers loaded:', this.suppliers);
        } else {
          console.error('Invalid supplier response:', response);
        }
      },
      error => {
        console.error('Error loading suppliers:', error);
        Swal.fire('Error', 'Gagal memuat data supplier.', 'error');
      }
    );
  }

  /** Menangani event pemilihan file logo */
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        console.log('Selected file:', this.selectedFile.name);
      }
    }
  }

  /** Mengirim data supplier info (kode_vendor, status, dan logo) ke backend */
  onSubmitSupplierInfo(event: Event): void {
    event.preventDefault();

    // Validasi field
    if (!this.supplier.kode_vendor || !this.supplier.status) {
      Swal.fire('Error', 'Silakan pilih supplier dan status.', 'error');
      return;
    }

    // Buat FormData
    const formData = new FormData();
    formData.append('kode_vendor', this.supplier.kode_vendor);
    formData.append('status', this.supplier.status);

    // Jika ada file yang dipilih, tambahkan ke FormData
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    }

    // Kirim POST request ke /api/supplier-info
    this.http.post(`${this.apiUrl}/api/supplier-info`, formData).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire('Success', 'Supplier info berhasil diupdate.', 'success');
        } else {
          Swal.fire('Error', 'Gagal mengupdate supplier info.', 'error');
        }
      },
      error => {
        console.error('Error uploading supplier info:', error);
        Swal.fire('Error', 'Gagal mengupdate supplier info.', 'error');
      }
    );
  }
}
