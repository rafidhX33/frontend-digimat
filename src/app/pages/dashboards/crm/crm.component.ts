import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  kode_vendor: string;
}

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {
  // Dropdown data
  materials: Material[] = [];
  filteredSuppliers: Supplier[] = [];
  selectedMaterial: string | null = null;
  selectedSupplier: Supplier | null = null;

  // For file upload
  selectedFile: File | null = null;
  // List of documents (hasil upload)
  documents: any[] = [];

  // API URL (sesuaikan jika diperlukan)
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.getDocuments();
  }

  /** Mengambil daftar material dari API (database 1) */
  loadMaterials(): void {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      res => {
        // Sesuaikan dengan format API, misalnya: { success: true, data: [...] }
        this.materials = res.data || res;
      },
      error => {
        console.error('Error loading materials:', error);
      }
    );
  }

  /** Ketika material dipilih, filter supplier berdasarkan material tersebut */
  updateSuppliers(): void {
    if (!this.selectedMaterial) return;
    // Misal endpoint: GET /api/suppliers/material/{material_code}
    this.http.get<any>(`${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`).subscribe(
      res => {
        this.filteredSuppliers = res.data || res;
        this.selectedSupplier = null; // Reset pilihan supplier jika material berubah
      },
      error => {
        console.error('Error loading suppliers:', error);
      }
    );
  }

  /** Opsional: Update info supplier jika diperlukan */
  updateSupplierInfo(): void {
    if (!this.selectedSupplier) return;
    // Tambahkan logika tambahan jika ingin memuat info detail supplier
  }

  /** Menangani pemilihan file */
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  /** Mengirim form upload dokumen ke API (database 2) */
  onSubmit(): void {
    if (!this.selectedSupplier || !this.selectedMaterial) {
      alert('Silakan pilih material dan supplier.');
      return;
    }
    const formData = new FormData();
    // Gunakan kode vendor dari supplier yang dipilih dan material code yang dipilih
    formData.append('kode_vendor', this.selectedSupplier.kode_vendor);
    formData.append('material_code', this.selectedMaterial);
    if (this.selectedFile) {
      formData.append('doc_qs', this.selectedFile, this.selectedFile.name);
    }
    this.http.post(`${this.apiUrl}/api/doc`, formData).subscribe(
      res => {
        console.log('Document created:', res);
        this.getDocuments();
      },
      error => {
        console.error('Error uploading document:', error);
      }
    );
  }

  /** Mengambil daftar dokumen yang sudah diupload */
  getDocuments(): void {
    this.http.get<any>(`${this.apiUrl}/api/doc`).subscribe(
      res => {
        this.documents = res.data || res;
      },
      error => {
        console.error('Error loading documents:', error);
      }
    );
  }
}
