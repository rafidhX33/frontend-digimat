import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Supplier {
  kode_vendor: string;
  name_vendor: string;
  image?: string;
  status?: string;
  supplierScore?: number;
  complaintCount?: number;
}

interface Material {
  material_code: string;
  nama_material: string;
  // tambahkan properti lain jika diperlukan
}

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  // Data untuk dropdown
  materials: Material[] = [];
  filteredSuppliers: Supplier[] = [];
  selectedMaterial: string | null = null;
  selectedSupplier: Supplier | null = null;

  // File upload untuk tiga dokumen
  selectedFileQs: File | null = null;
  selectedFileSs: File | null = null;
  selectedFileAios: File | null = null;

  // List dokumen yang sudah diupload
  documents: any[] = [];

  // API URL (sesuaikan jika diperlukan)
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.getDocuments();
  }

  /** Ambil daftar material dari API (database 1) */
  loadMaterials(): void {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      res => {
        // Pastikan respons API mengandung data di properti "data"
        this.materials = res.data || res;
        console.log('Materials:', this.materials);
      },
      error => {
        console.error('Error loading materials:', error);
        Swal.fire('Error', 'Gagal memuat data material.', 'error');
      }
    );
  }

  /** Saat material dipilih, ambil supplier terkait dari API */
  updateSuppliers(): void {
    if (!this.selectedMaterial) {
      console.warn('Selected material kosong');
      return;
    }
    const url = `${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`;
    console.log('Fetching suppliers from:', url);
    this.http.get<any>(url).subscribe(
      res => {
        console.log('Response supplier:', res);
        if (res && res.success && Array.isArray(res.data)) {
          this.filteredSuppliers = res.data;
        } else {
          console.warn('Format response supplier tidak sesuai:', res);
          this.filteredSuppliers = [];
        }
        this.selectedSupplier = null;
        if (this.filteredSuppliers.length === 0) {
          console.warn('Supplier tidak ditemukan untuk material:', this.selectedMaterial);
          Swal.fire('Info', 'Supplier tidak ditemukan untuk material yang dipilih.', 'info');
        }
      },
      error => {
        console.error('Error loading suppliers:', error);
        Swal.fire('Error', 'Gagal memuat data supplier.', 'error');
        this.filteredSuppliers = [];
      }
    );
  }

  /** Opsional: Update info supplier jika diperlukan */
  updateSupplierInfo(): void {
    console.log('Selected supplier:', this.selectedSupplier);
    // Tambahkan logika tambahan jika diperlukan untuk memuat info detail supplier
  }

  /** Terima file dari input berdasarkan tipe dokumen */
  onFileSelected(event: any, type: string): void {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (type === 'doc_qs') {
        this.selectedFileQs = file;
      } else if (type === 'doc_ss') {
        this.selectedFileSs = file;
      } else if (type === 'doc_aios') {
        this.selectedFileAios = file;
      }
    }
  }

  /** Kirim form upload dokumen ke API (database 2) */
  onSubmit(): void {
    if (!this.selectedSupplier || !this.selectedMaterial) {
      Swal.fire('Error', 'Silakan pilih material dan supplier.', 'error');
      return;
    }
    if (!this.selectedSupplier.kode_vendor) {
      Swal.fire('Error', 'Data supplier tidak lengkap. Kode vendor tidak ditemukan.', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('kode_vendor', this.selectedSupplier.kode_vendor);
    formData.append('material_code', this.selectedMaterial);
    if (this.selectedFileQs) {
      formData.append('doc_qs', this.selectedFileQs, this.selectedFileQs.name);
    }
    if (this.selectedFileSs) {
      formData.append('doc_ss', this.selectedFileSs, this.selectedFileSs.name);
    }
    if (this.selectedFileAios) {
      formData.append('doc_aios', this.selectedFileAios, this.selectedFileAios.name);
    }
    console.log('Submitting form with:', {
      kode_vendor: this.selectedSupplier.kode_vendor,
      material_code: this.selectedMaterial,
      doc_qs: this.selectedFileQs ? this.selectedFileQs.name : null,
      doc_ss: this.selectedFileSs ? this.selectedFileSs.name : null,
      doc_aios: this.selectedFileAios ? this.selectedFileAios.name : null
    });
    this.http.post(`${this.apiUrl}/api/doc`, formData).subscribe(
      res => {
        console.log('Document created:', res);
        Swal.fire('Success', 'Dokumen berhasil diupload.', 'success');
        this.getDocuments();
      },
      error => {
        console.error('Error uploading document:', error);
        Swal.fire('Error', 'Gagal mengupload dokumen.', 'error');
      }
    );
  }

    /** 🔹 Navigasi kembali ke halaman Supplier */
    goBackToSupplier(): void {
      this.router.navigate(["/supplier"]);
    }
  

  /** Ambil daftar dokumen yang sudah diupload */
  getDocuments(): void {
    this.http.get<any>(`${this.apiUrl}/api/doc`).subscribe(
      res => {
        this.documents = res.data || res;
        console.log('Documents:', this.documents);
      },
      error => {
        console.error('Error loading documents:', error);
      }
    );
  }
}
