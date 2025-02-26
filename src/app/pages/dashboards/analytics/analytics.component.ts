import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

interface Supplier {
  kode_vendor: string;
  name_vendor: string;
  image?: string; // Logo Supplier
  status?: string; // Status Supplier
  supplierScore?: string; // Grade (A, B, C, D)
  complaintCount?: number;
}

interface Material {
  material_code: string;
  nama_material: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  selectedMaterial: string | null = null;
  selectedSupplier: Supplier | null = null;
  materials: Material[] = [];
  filteredSuppliers: Supplier[] = [];
  pdfs: { src: SafeResourceUrl, title: string }[] = [];
  certifications: any[] = [];
  supplierInfo: Supplier | null = null;
  visualDesigns: any[] = [];
  materialFlowProcess: any[] = [];
  supplierQualityDevice: any[] = [];
  supplierAudits: any[] = [];

  private apiUrl = 'http://localhost:5000';
  public baseUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Packaging', active: true }
    ];
    this.loadMaterials();
  }

  /** Load daftar material dari API */
  loadMaterials() {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.materials = response.data;
          console.log("Materials loaded:", this.materials);
        } else {
          console.error("Invalid data format for materials:", response);
        }
      },
      error => {
        console.error("Error loading materials:", error);
        Swal.fire('Error', 'Gagal memuat data material.', 'error');
      }
    );
  }

  /** Update daftar supplier berdasarkan material yang dipilih */
  updateSuppliers() {
    if (!this.selectedMaterial) {
      console.warn('Selected material kosong');
      return;
    }
    const url = `${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`;
    this.http.get<any>(url).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.filteredSuppliers = response.data;
          this.selectedSupplier = null;
          console.log("Suppliers loaded:", this.filteredSuppliers);
        } else {
          console.error("Invalid supplier data format:", response);
        }
      },
      error => {
        console.error("Error loading suppliers:", error);
        Swal.fire('Error', 'Gagal memuat data supplier.', 'error');
        this.filteredSuppliers = [];
      }
    );
  }

  /** Update info supplier ketika supplier dipilih */
  updateSupplierInfo() {
    if (!this.selectedSupplier || !this.selectedMaterial) return;
    console.log("Selected supplier:", this.selectedSupplier);
    this.supplierInfo = { ...this.selectedSupplier, supplierScore: "-", complaintCount: 0 };

    // Load Supplier Grade, Complaint Count, Logo, dan Status
    this.loadSupplierData(this.selectedSupplier.kode_vendor);

    // Load Dokumen Supplier
    this.loadSupplierDocs(this.selectedSupplier.kode_vendor, this.selectedMaterial);
  }

  /** Mengambil data Supplier (Grade, Complaint Count, Logo, Status) */
  loadSupplierData(kodeVendor: string) {
    const start = "2024-01-01";
    const end = "2024-12-31";
    const urlGrade = `${this.apiUrl}/api/suppliers/grade?kode_vendor=${kodeVendor}&start=${start}&end=${end}`;
    const urlComplaint = `${this.apiUrl}/api/suppliers/complaints?kode_vendor=${kodeVendor}&start=${start}&end=${end}`;
    const urlSupplierDetails = `${this.apiUrl}/api/suppliers/details?kode_vendor=${kodeVendor}`;

    // Fetch Supplier Grade
    this.http.get<any>(urlGrade).subscribe(
      response => {
        if (response.success && response.data.length > 0) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            supplierScore: response.data[0].Grade_Material || "-"
          };
        } else {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            supplierScore: "-"
          };
        }
      },
      error => {
        console.error("Error loading supplier grade:", error);
        this.selectedSupplier = {
          ...this.selectedSupplier!,
          supplierScore: "-"
        };
      }
    );

    // Fetch Complaint Count
    this.http.get<any>(urlComplaint).subscribe(
      response => {
        if (response.success) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            complaintCount: response.data.total_complaints || 0
          };
        } else {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            complaintCount: 0
          };
        }
      },
      error => {
        console.error("Error loading complaint count:", error);
        this.selectedSupplier = {
          ...this.selectedSupplier!,
          complaintCount: 0
        };
      }
    );

    // Fetch Supplier Logo & Status
    this.http.get<any>(urlSupplierDetails).subscribe(
      response => {
        if (response.success && response.data) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            image: response.data.image || "default-logo.png",
            status: response.data.status || "Unknown"
          };
        }
      },
      error => {
        console.error("Error loading supplier details:", error);
      }
    );
  }

  /** Memuat dokumen PDF dari endpoint /api/doc dengan filter berdasarkan kode_vendor dan material_code */
  loadSupplierDocs(kodeVendor: string, materialCode: string) {
    const url = `${this.apiUrl}/api/doc?supplier=${kodeVendor}`;
    console.log("Fetching docs from:", url);

    this.http.get<any>(url).subscribe(
      response => {
        let docs: any[] = [];
        if (Array.isArray(response)) {
          docs = response;
        } else if (response.success && Array.isArray(response.data)) {
          docs = response.data;
        } else {
          console.error("Invalid doc data format:", response);
          return;
        }

        // Filter dokumen berdasarkan kombinasi kode_vendor dan material_code
        const filteredDocs = docs.filter(doc =>
          doc.kode_vendor === kodeVendor && doc.material_code === materialCode
        );

        this.pdfs = [];
        filteredDocs.forEach(doc => {
          const qsPath = doc.doc_url_qs ? doc.doc_url_qs.replace(/\\/g, '/') : null;
          const ssPath = doc.doc_url_ss ? doc.doc_url_ss.replace(/\\/g, '/') : null;
          const aiosPath = doc.doc_url_aios ? doc.doc_url_aios.replace(/\\/g, '/') : null;

          if (qsPath) {
            const qsUrl = `${this.baseUrl}/${qsPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(qsUrl),
              title: doc.doc_name_qs || 'Quality Statement'
            });
          }
          if (ssPath) {
            const ssUrl = `${this.baseUrl}/${ssPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(ssUrl),
              title: doc.doc_name_ss || 'Supplier Statement'
            });
          }
          if (aiosPath) {
            const aiosUrl = `${this.baseUrl}/${aiosPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(aiosUrl),
              title: doc.doc_name_aios || 'AIOS Document'
            });
          }
        });
        console.log("Filtered docs:", this.pdfs);
      },
      error => {
        console.error("Error loading doc data:", error);
      }
    );
  }
}
