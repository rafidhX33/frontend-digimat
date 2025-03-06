import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import Swal from "sweetalert2";

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

interface PDFData {
  src: SafeResourceUrl;
  url: string;
  title: string;
}

interface Abnormality {
  abnormal: string;
  total_case: number;
  date: Date;
}

interface KedatanganData {
  inspection_lot: string;
  plan: string;
  vendor: string;
  material: string;
  lotno: string;
  insp_quantity: number;
  satuan: string;
}

@Component({
  selector: "app-crm",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  // Dropdowns
  selectedMaterial: string | null = null;
  selectedSupplier: Supplier | null = null;
  materials: Material[] = [];
  filteredSuppliers: Supplier[] = [];

  // Documents (PDF)
  pdfs: PDFData[] = [];

  // Supplier Audit
  supplierAudits: AuditData[] = [];

  // Abnormality Historical
  supplierAbnormalities: Abnormality[] = [];
  abnormalityPage: number = 1;
  abnormalityPageSize: number = 6;

  // Kedatangan SAP
  kedatanganData: KedatanganData[] = [];
  kedatanganPage: number = 1;
  kedatanganPageSize: number = 6;
  pageSizeOptions: number[] = [6, 10, 15];

  // Visual Design
  visualDesigns: any[] = [];

  // Filter range untuk abnormality
  selectedRange: "all" | "1m" | "6m" | "1y" = "all";

  // Filter tanggal kedatangan
  kedatanganStart: string = "";
  kedatanganEnd: string = "";

  private apiUrl = "http://localhost:5000";
  public baseUrl: string = "http://localhost:5000";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboards" },
      { label: "Packaging", active: true },
    ];
    this.loadMaterials();

    // Set default tanggal kedatangan: awal dan akhir bulan ini
    const now = new Date();
    this.kedatanganStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .substring(0, 10);
    this.kedatanganEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .substring(0, 10);
  }

  /** Load daftar material */
  loadMaterials(): void {
    this.http.get<any>(`${this.apiUrl}/api/materials`).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.materials = response.data;
          if (this.materials.length > 0) {
            this.selectedMaterial = this.materials[0].material_code;
            this.updateSuppliers();
          }
        } else {
          console.error("Invalid data format for materials:", response);
        }
      },
      (error) => {
        console.error("Error loading materials:", error);
        Swal.fire("Error", "Gagal memuat data material.", "error");
      }
    );
  }

  /** Update supplier berdasarkan material */
  updateSuppliers(): void {
    if (!this.selectedMaterial) return;
    const url = `${this.apiUrl}/api/suppliers/material/${this.selectedMaterial}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.filteredSuppliers = response.data;
          if (this.filteredSuppliers.length > 0) {
            this.selectedSupplier = this.filteredSuppliers[0];
            this.updateSupplierInfo();
          }
        } else {
          this.filteredSuppliers = [];
        }
      },
      (error) => {
        console.error("Error loading suppliers:", error);
        Swal.fire("Error", "Gagal memuat data supplier.", "error");
      }
    );
  }

  /** Ketika supplier dipilih */
  updateSupplierInfo(): void {
    if (!this.selectedSupplier || !this.selectedMaterial) return;
    this.selectedSupplier = {
      ...this.selectedSupplier,
      supplierScore: "-",
      complaintCount: 0,
    };
    this.loadSupplierData(this.selectedSupplier.kode_vendor);
    this.loadSupplierDocs(
      this.selectedSupplier.kode_vendor,
      this.selectedMaterial
    );
    this.loadSupplierAudit(this.selectedSupplier.kode_vendor);
    this.loadAbnormalities(
      this.selectedSupplier.kode_vendor,
      this.selectedRange
    );
    this.loadKedatangan(
      this.selectedSupplier.kode_vendor,
      this.selectedMaterial,
      this.kedatanganStart,
      this.kedatanganEnd
    );
  }

  /** Ambil data supplier (grade, complaint, logo, status) */
  loadSupplierData(kode_vendor: string): void {
    const start = "2024-01-01";
    const end = "2024-12-31";
    const urlGrade = `${this.apiUrl}/api/suppliers/grade?kode_vendor=${kode_vendor}&start=${start}&end=${end}`;
    const urlComplaint = `${this.apiUrl}/api/suppliers/complaints?kode_vendor=${kode_vendor}&start=${start}&end=${end}`;
    const urlSupplierDetails = `${this.apiUrl}/api/suppliers/details?kode_vendor=${kode_vendor}`;
    const urlSupplierInfo = `${this.apiUrl}/api/supplier-info/${kode_vendor}`;

    // Grade
    this.http.get<any>(urlGrade).subscribe(
      (response) => {
        if (
          response.success &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            supplierScore: response.data[0].Grade_Material || "-",
          };
        } else {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            supplierScore: "-",
          };
        }
      },
      (error) => {
        console.error("Error loading supplier grade:", error);
        this.selectedSupplier = {
          ...this.selectedSupplier!,
          supplierScore: "-",
        };
      }
    );
    // Complaint
    this.http.get<any>(urlComplaint).subscribe(
      (response) => {
        if (response.success) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            complaintCount: response.data.total_complaints || 0,
          };
        } else {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            complaintCount: 0,
          };
        }
      },
      (error) => {
        console.error("Error loading complaint count:", error);
        this.selectedSupplier = {
          ...this.selectedSupplier!,
          complaintCount: 0,
        };
      }
    );
    // Supplier Details
    this.http.get<any>(urlSupplierDetails).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            image: response.data.image || "assets/default-logo.png",
            status: response.data.status || "Unknown",
          };
        }
      },
      (error) => {
        console.error("Error loading supplier details:", error);
      }
    );
    // Supplier Info
    this.http.get<any>(urlSupplierInfo).subscribe(
      (response) => {
        if (response.success && response.data) {
          const logoUrl = response.data.logo
            ? `${this.baseUrl}/uploads/${response.data.logo}`
            : "assets/default-logo.png";
          this.selectedSupplier = {
            ...this.selectedSupplier!,
            image: logoUrl,
            status: response.data.status || "Unknown",
          };
        }
      },
      (error) => {
        console.error("Error loading supplier info:", error);
      }
    );
  }

  /** Load dokumen PDF */
  loadSupplierDocs(kode_vendor: string, material_code: string): void {
    const url = `${this.apiUrl}/api/doc?supplier=${kode_vendor}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        let docs: any[] = [];
        if (Array.isArray(response)) {
          docs = response;
        } else if (response.success && Array.isArray(response.data)) {
          docs = response.data;
        }

        // Filter dokumen berdasarkan kode_vendor dan material_code
        const filteredDocs = docs.filter(
          (doc) =>
            doc.kode_vendor?.trim() === kode_vendor.trim() &&
            doc.material_code?.trim() === material_code.trim()
        );

        this.pdfs = [];
        filteredDocs.forEach((doc) => {
          const cleanPath = (path: string | null) =>
            path ? path.replace(/\\/g, "/") : null; // Konversi semua backslash ke slash

          const qsPath = cleanPath(doc.doc_url_qs);
          const ssPath = cleanPath(doc.doc_url_ss);
          const aiosPath = cleanPath(doc.doc_url_aios);

          if (qsPath) {
            const qsUrl = `${this.baseUrl}/${qsPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(qsUrl),
              url: qsUrl,
              title: doc.doc_name_qs || "Quality Statement",
            });
          }
          if (ssPath) {
            const ssUrl = `${this.baseUrl}/${ssPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(ssUrl),
              url: ssUrl,
              title: doc.doc_name_ss || "Supplier Specification",
            });
          }
          if (aiosPath) {
            const aiosUrl = `${this.baseUrl}/${aiosPath}`;
            this.pdfs.push({
              src: this.sanitizer.bypassSecurityTrustResourceUrl(aiosUrl),
              url: aiosUrl,
              title: doc.doc_name_aios || "AIOS Document",
            });
          }
        });

        console.log("Filtered PDFs:", this.pdfs);
      },
      (error) => {
        console.error("Error loading doc data:", error);
      }
    );
  }

  /** Load Supplier Audit */
  loadSupplierAudit(kode_vendor: string): void {
    const url = `${this.apiUrl}/api/supplier-audit/${kode_vendor}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierAudits = response.data;
        } else {
          this.supplierAudits = [];
        }
      },
      (error) => {
        console.error("Error loading supplier audits:", error);
        this.supplierAudits = [];
      }
    );
  }

  /** Load Abnormality Historical */
  loadAbnormalities(kode_vendor: string, range: string): void {
    const url = `${this.apiUrl}/api/abnormalities/${kode_vendor}?range=${range}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.supplierAbnormalities = response.data.map((item: any) => ({
            abnormal: item.abnormal,
            total_case: Number(item.total_case),
            date: item.date_occurrence
              ? new Date(item.date_occurrence)
              : new Date(),
          }));
          this.abnormalityPage = 1;
        } else {
          this.supplierAbnormalities = [];
        }
      },
      (error) => {
        console.error("Error loading abnormalities:", error);
        this.supplierAbnormalities = [];
      }
    );
  }

  /** Load Kedatangan SAP berdasarkan supplier & material dan filter tanggal */
  loadKedatangan(
    kode_vendor: string,
    material_code: string,
    startDate: string,
    endDate: string
  ): void {
    const url = `${this.apiUrl}/api/kedatangan?supplier=${kode_vendor}&material=${material_code}&start=${startDate}&end=${endDate}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          const filtered = response.data.filter(
            (item: KedatanganData) =>
              item.vendor.trim() === kode_vendor.trim() &&
              item.material.trim() === material_code.trim()
          );
          this.kedatanganData = filtered;
          this.kedatanganPage = 1;
        } else {
          this.kedatanganData = [];
        }
      },
      (error) => {
        console.error("Error loading kedatangan data:", error);
        this.kedatanganData = [];
      }
    );
  }

  /** Handle perubahan tanggal kedatangan */
  onKedatanganDateChange(): void {
    if (this.selectedSupplier && this.selectedMaterial) {
      this.loadKedatangan(
        this.selectedSupplier.kode_vendor,
        this.selectedMaterial,
        this.kedatanganStart,
        this.kedatanganEnd
      );
    }
  }

  /** Reset halaman kedatangan */
  resetKedatanganPage(): void {
    this.kedatanganPage = 1;
    this.onKedatanganDateChange();
  }

  /** Paginasi Abnormality Historical */
  get totalAbnormalityPages(): number {
    return Math.ceil(
      this.supplierAbnormalities.length / this.abnormalityPageSize
    );
  }
  get paginatedAbnormalities(): Abnormality[] {
    const startIndex = (this.abnormalityPage - 1) * this.abnormalityPageSize;
    return this.supplierAbnormalities.slice(
      startIndex,
      startIndex + this.abnormalityPageSize
    );
  }
  nextAbnormalityPage(): void {
    if (this.abnormalityPage < this.totalAbnormalityPages) {
      this.abnormalityPage++;
    }
  }
  prevAbnormalityPage(): void {
    if (this.abnormalityPage > 1) {
      this.abnormalityPage--;
    }
  }

  /** Paginasi Kedatangan SAP */
  get totalKedatanganPages(): number {
    return Math.ceil(this.kedatanganData.length / this.kedatanganPageSize);
  }
  get paginatedKedatangan(): KedatanganData[] {
    const startIndex = (this.kedatanganPage - 1) * this.kedatanganPageSize;
    return this.kedatanganData.slice(
      startIndex,
      startIndex + this.kedatanganPageSize
    );
  }
  nextKedatanganPage(): void {
    if (this.kedatanganPage < this.totalKedatanganPages) {
      this.kedatanganPage++;
    }
  }
  prevKedatanganPage(): void {
    if (this.kedatanganPage > 1) {
      this.kedatanganPage--;
    }
  }

  /** Preview PDF: Redirect ke URL asli */
  previewPDF(pdf: PDFData): void {
    window.open(pdf.url, "_blank");
  }

  /** Detail Audit menggunakan SweetAlert2 */
  detailAudit(audit: any): void {
    Swal.fire({
      title: "Audit Detail",
      html: `
        <p><strong>Plan Type:</strong> ${audit.plan_type || "-"}</p>
        <p><strong>City:</strong> ${audit.city || "-"}</p>
        <p><strong>Date Complete:</strong> ${
          audit.date_complete
            ? new Date(audit.date_complete).toLocaleString()
            : "-"
        }</p>
        <p><strong>Score:</strong> ${audit.score || "-"}</p>
        <p><strong>Improvement:</strong> ${audit.improvment || "-"}</p>
      `,
      imageUrl: audit.evidence
        ? `https://myapps.aio.co.id/track/upload/${audit.evidence}`
        : "",
      imageHeight: 200,
    });
  }

  /** Set filter range untuk abnormality */
  setRange(range: "all" | "1m" | "6m" | "1y"): void {
    this.selectedRange = range;
    if (this.selectedSupplier) {
      this.loadAbnormalities(this.selectedSupplier.kode_vendor, range);
    }
  }
}
