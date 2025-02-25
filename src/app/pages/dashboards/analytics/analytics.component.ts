import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  selectedMaterial: string | null = null;
  selectedSupplier: any = null;
  materials: any[] = [];
  filteredSuppliers: any[] = [];
  pdfs: { src: any, title: string }[] = [];
  certifications: any[] = [];
  supplierInfo: any = null;
  visualDesigns: any[] = [];
  materialFlowProcess: any[] = [];
  supplierQualityDevice: any[] = [];
  supplierAudits: any[] = [];

  private apiUrl = 'http://localhost:5000'; // Sesuaikan dengan URL backend

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Packaging', active: true }
    ];

    this.loadMaterials(); // Ambil daftar material saat halaman dimuat
  }

  /** 🔹 Load daftar material dari API */
  loadMaterials() {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.materials = response.data;  // ✅ Ambil array dari data
          console.log("Materials loaded:", this.materials);
        } else {
          console.error("Invalid data format:", response);
        }
      },
      error => {
        console.error("Error loading materials:", error);
      }
    );
  }

  /** 🔹 Update daftar supplier berdasarkan material yang dipilih */
  updateSuppliers() {
    if (!this.selectedMaterial) return;

    console.log("Fetching suppliers for material:", this.selectedMaterial);
    this.http.get<any>(`${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.filteredSuppliers = response.data;
          this.selectedSupplier = null;  // Reset supplier jika material berubah
          console.log("Suppliers loaded:", this.filteredSuppliers);
        } else {
          console.error("Invalid supplier data format:", response);
        }
      },
      error => {
        console.error("Error loading suppliers:", error);
      }
    );
  }

  /** 🔹 Update informasi supplier ketika supplier dipilih */
  updateSupplierInfo() {
    if (!this.selectedSupplier) return;

    console.log("Fetching info for supplier:", this.selectedSupplier.kode_vendor);
    this.supplierInfo = this.selectedSupplier;

    // Load daftar PDF terkait supplier
    this.http.get<any>(`${this.apiUrl}/api/pdfs?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.pdfs = response.data.map((pdf: { src: string, title: string }) => ({
            src: this.sanitizer.bypassSecurityTrustResourceUrl(pdf.src),
            title: pdf.title
          }));
          console.log("PDFs loaded:", this.pdfs);
        } else {
          console.error("Invalid PDFs data format:", response);
        }
      }, error => {
        console.error("Error loading PDFs:", error);
      });

    // Load sertifikasi supplier
    this.http.get<any>(`${this.apiUrl}/api/certifications?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.certifications = response.data;
          console.log("Certifications loaded:", this.certifications);
        } else {
          console.error("Invalid certifications data format:", response);
        }
      }, error => {
        console.error("Error loading certifications:", error);
      });

    // Load hasil audit supplier
    this.http.get<any>(`${this.apiUrl}/api/supplier-audit?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierAudits = response.data;
          console.log("Supplier audits loaded:", this.supplierAudits);
        } else {
          console.error("Invalid supplier audit data format:", response);
        }
      }, error => {
        console.error("Error loading supplier audit:", error);
      });

    // Load desain visual supplier
    this.http.get<any>(`${this.apiUrl}/api/visual-design?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.visualDesigns = response.data;
          console.log("Visual designs loaded:", this.visualDesigns);
        } else {
          console.error("Invalid visual designs data format:", response);
        }
      }, error => {
        console.error("Error loading visual designs:", error);
      });

    // Load material flow process
    this.http.get<any>(`${this.apiUrl}/api/materialflowprocess?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.materialFlowProcess = response.data;
          console.log("Material flow process loaded:", this.materialFlowProcess);
        } else {
          console.error("Invalid material flow data format:", response);
        }
      }, error => {
        console.error("Error loading material flow process:", error);
      });

    // Load supplier quality device
    this.http.get<any>(`${this.apiUrl}/api/supplier-quality-device?supplier=${this.selectedSupplier.kode_vendor}`)
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierQualityDevice = response.data;
          console.log("Supplier quality device data loaded:", this.supplierQualityDevice);
        } else {
          console.error("Invalid supplier quality device data format:", response);
        }
      }, error => {
        console.error("Error loading supplier quality device data:", error);
      });
  }
}