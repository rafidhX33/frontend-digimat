import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface Supplier {
  kode_vendor: string;
  name_vendor: string;
  image?: string;
  status?: string;
  hasDocs: boolean;
  hasAudit: boolean;
  hasAbnormality: boolean;
}

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"],
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  totalSuppliers: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  private apiUrl = "http://localhost:5000/api";
  private uploadPath = "http://localhost:5000/uploads";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  /** 🔹 Load daftar supplier */
  loadSuppliers(): void {
    this.http.get<any>(`${this.apiUrl}/suppliers`).subscribe(
      (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.suppliers = response.data.map((item: any) => ({
            kode_vendor: item.kode_vendor,
            name_vendor: item.name_vendor,
            image: item.image ? `${this.uploadPath}/${item.image}` : "assets/default-logo.png",
            status: item.status || "Unknown",
            hasDocs: false,
            hasAudit: false,
            hasAbnormality: false,
          }));

          this.totalSuppliers = this.suppliers.length;

          this.suppliers.forEach((supplier, index) => {
            this.checkSupplierInfo(supplier.kode_vendor, index);
            this.checkDocumentStatus(supplier.kode_vendor, index);
            this.checkAuditStatus(supplier.kode_vendor, index);
            this.checkAbnormalityStatus(supplier.kode_vendor, index);
          });
        }
      },
      (error) => {
        console.error("Error fetching suppliers:", error);
      }
    );
  }

  /** Pagination */
  get totalPages(): number {
    return Math.ceil(this.totalSuppliers / this.pageSize);
  }

  get paginatedSuppliers(): Supplier[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.suppliers.slice(startIndex, startIndex + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /** 🔹 Cek informasi status & logo supplier */
  checkSupplierInfo(kode_vendor: string, index: number): void {
    this.http.get<any>(`${this.apiUrl}/supplier-info/${kode_vendor}`).subscribe(
      (response) => {
        if (response.success && response.data) {
          this.suppliers[index].status = response.data.status || "Unknown";
          this.suppliers[index].image = response.data.logo
            ? `${this.uploadPath}/${response.data.logo}`
            : "assets/default-logo.png";
        }
      },
      (error) => {
        console.error(`Error fetching supplier info for ${kode_vendor}:`, error);
      }
    );
  }

  /** 🔹 Cek apakah supplier memiliki dokumen */
  checkDocumentStatus(kode_vendor: string, index: number): void {
    this.http.get<any>(`${this.apiUrl}/doc?supplier=${kode_vendor}`).subscribe(
      (response) => {
        if (Array.isArray(response) || (response.success && Array.isArray(response.data))) {
          const docs = Array.isArray(response) ? response : response.data;
  
          // Filter hanya dokumen yang sesuai dengan supplier tertentu
          const supplierDocs = docs.filter((doc: any) => doc.kode_vendor === kode_vendor);
  
          this.suppliers[index].hasDocs = supplierDocs.length > 0; // Hanya true jika ada dokumen
        } else {
          this.suppliers[index].hasDocs = false;
        }
      },
      (error) => {
        console.error(`Error checking documents for ${kode_vendor}:`, error);
        this.suppliers[index].hasDocs = false; // Default jika error terjadi
      }
    );
  }
  
  /** 🔹 Cek apakah supplier memiliki audit */
  checkAuditStatus(kode_vendor: string, index: number): void {
    this.http.get<any>(`${this.apiUrl}/supplier-audit/${kode_vendor}`).subscribe(
      (response) => {
        this.suppliers[index].hasAudit = response.success && response.data.length > 0;
        console.log(`Audit for ${kode_vendor}:`, this.suppliers[index].hasAudit);
      },
      (error) => {
        console.error(`Error checking audit for ${kode_vendor}:`, error);
      }
    );
  }

  /** 🔹 Cek apakah supplier memiliki abnormality */
  checkAbnormalityStatus(kode_vendor: string, index: number): void {
    this.http.get<any>(`${this.apiUrl}/abnormalities/${kode_vendor}?range=all`).subscribe(
      (response) => {
        this.suppliers[index].hasAbnormality = response.success && response.data.length > 0;
        console.log(`Abnormality for ${kode_vendor}:`, this.suppliers[index].hasAbnormality);
      },
      (error) => {
        console.error(`Error checking abnormalities for ${kode_vendor}:`, error);
      }
    );
  }
}
