import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

interface Supplier {
  kode_vendor: string;
  name_vendor: string;
  image?: string;
  status?: string;
  supplierScore?: string;
  complaintCount?: number;
}

interface Material {
  material_code: string;
  nama_material: string;
}

interface AuditData {
  id: number;
  plan_type: string | null;
  plant: string | null;
  date_plan: string | null;
  code_supplier: string | null;
  name_vendor: string | null;
  city: string | null;
  date_complete: string | null;
  score: number | null;
  status: number | null;
  evidence: string | null;
  improvment: string | null;
}

interface Abnormality {
  abnormal: string;
  total_case: number;
}

@Component({
  selector: 'app-crm',
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
  supplierAudits: AuditData[] = [];

  // Data Abnormality
  supplierAbnormalities: Abnormality[] = [];

  // Range filter: 'all' | '1m' | '6m' | '1y'
  selectedRange: 'all' | '1m' | '6m' | '1y' = 'all';

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

  // Mengubah range filter
  setRange(range: 'all' | '1m' | '6m' | '1y'): void {
    this.selectedRange = range;
    // Jika supplier sudah dipilih, reload data abnormalities
    if (this.selectedSupplier) {
      this.loadAbnormalities(this.selectedSupplier.kode_vendor, this.selectedRange);
    }
  }

  // Memuat daftar material
  loadMaterials(): void {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.materials = response.data;
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

  // Ketika material dipilih
  updateSuppliers(): void {
    if (!this.selectedMaterial) return;
    const url = `${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`;
    this.http.get<any>(url).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.filteredSuppliers = response.data;
          this.selectedSupplier = null;
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

  // Ketika supplier dipilih
  updateSupplierInfo(): void {
    if (!this.selectedSupplier || !this.selectedMaterial) return;

    // Set default data
    this.selectedSupplier = {
      ...this.selectedSupplier,
      supplierScore: "-",
      complaintCount: 0
    };

    // Load data Supplier (Grade, Complaint, dsb.)
    this.loadSupplierData(this.selectedSupplier.kode_vendor);

    // Load Dokumen (PDF)
    this.loadSupplierDocs(this.selectedSupplier.kode_vendor, this.selectedMaterial);

    // Load Audit
    this.loadSupplierAudit(this.selectedSupplier.kode_vendor);

    // Load Abnormalities (menggunakan filter 'selectedRange')
    this.loadAbnormalities(this.selectedSupplier.kode_vendor, this.selectedRange);
  }

  // Memuat data Supplier (Grade, Complaint, Logo, Status)
  loadSupplierData(kode_vendor: string): void {
    const start = "2024-01-01";
    const end = "2024-12-31";
    const urlGrade = `${this.apiUrl}/api/suppliers/grade?kode_vendor=${kode_vendor}&start=${start}&end=${end}`;
    const urlComplaint = `${this.apiUrl}/api/suppliers/complaints?kode_vendor=${kode_vendor}&start=${start}&end=${end}`;
    const urlSupplierDetails = `${this.apiUrl}/api/suppliers/details?kode_vendor=${kode_vendor}`;
    const urlSupplierInfo = `${this.apiUrl}/api/supplier-info/${kode_vendor}`;

    // Grade
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

    // Complaint
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

    // Supplier Details
    this.http.get<any>(urlSupplierDetails).subscribe(
      response => {
        if (response.success && response.data) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            image: response.data.image || "assets/default-logo.png",
            status: response.data.status || "Unknown"
          };
        }
      },
      error => {
        console.error("Error loading supplier details:", error);
      }
    );

    // Supplier Info (logo, status)
    this.http.get<any>(urlSupplierInfo).subscribe(
      response => {
        if (response.success && response.data) {
          const logoUrl = response.data.logo ? `${this.baseUrl}/uploads/${response.data.logo}` : "assets/default-logo.png";
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            image: logoUrl,
            status: response.data.status || "Unknown"
          };
        }
      },
      error => {
        console.error("Error loading supplier info:", error);
      }
    );
  }

  // Memuat dokumen PDF
  loadSupplierDocs(kode_vendor: string, material_code: string): void {
    const url = `${this.apiUrl}/api/doc?supplier=${kode_vendor}`;
    this.http.get<any>(url).subscribe(
      response => {
        let docs: any[] = [];
        if (Array.isArray(response)) {
          docs = response;
        } else if (response.success && Array.isArray(response.data)) {
          docs = response.data;
        } else {
          return;
        }
        const filteredDocs = docs.filter(doc =>
          doc.kode_vendor === kode_vendor && doc.material_code === material_code
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
      },
      error => {
        console.error("Error loading doc data:", error);
      }
    );
  }

  // Memuat data Supplier Audit
  loadSupplierAudit(kode_vendor: string): void {
    const url = `${this.apiUrl}/api/supplier-audit/${kode_vendor}`;
    this.http.get<any>(url).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierAudits = response.data;
        } else {
          this.supplierAudits = [];
        }
      },
      error => {
        console.error("Error loading supplier audits:", error);
        this.supplierAudits = [];
      }
    );
  }

  // Memuat data Abnormalities dengan filter range
  loadAbnormalities(kode_vendor: string, range: string): void {
    // GET /api/abnormalities/:kode_vendor?range=all|1m|6m|1y
    const url = `${this.apiUrl}/api/abnormalities/${kode_vendor}?range=${range}`;
    this.http.get<any>(url).subscribe(
      response => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierAbnormalities = response.data.map((item: any) => ({
            abnormal: item.abnormal,
            total_case: item.total_case
          }));
        } else {
          this.supplierAbnormalities = [];
        }
      },
      error => {
        console.error('Error loading supplier abnormalities:', error);
        this.supplierAbnormalities = [];
      }
    );
  }

  // Preview PDF
  previewPDF(pdf: { src: SafeResourceUrl, title: string }): void {
    Swal.fire({
      title: pdf.title,
      html: `<iframe src="${pdf.src}" style="width:100%; height:600px;" frameborder="0"></iframe>`,
      width: '80%',
      showConfirmButton: true,
      confirmButtonText: 'Close'
    });
  }

  // Detail Audit
  detailAudit(audit: any): void {
    Swal.fire({
      title: 'Audit Detail',
      html: `
        <p><strong>Plan Type:</strong> ${audit.plan_type || '-'}</p>
        <p><strong>City:</strong> ${audit.city || '-'}</p>
        <p><strong>Date Complete:</strong> ${audit.date_complete ? new Date(audit.date_complete).toLocaleString() : '-'}</p>
        <p><strong>Score:</strong> ${audit.score || '-'}</p>
        <p><strong>Improvement:</strong> ${audit.improvment || '-'}</p>
      `,
      imageUrl: audit.evidence ? `https://myapps.aio.co.id/track/upload/${audit.evidence}` : '',
      imageHeight: 200
    });
  }
}
