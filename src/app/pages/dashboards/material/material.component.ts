import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Material {
    material_code: string;
    nama_material: string;
}

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
    materials: Material[] = []; // Semua data material
    paginatedMaterials: Material[] = []; // Data material yang ditampilkan per halaman
    currentPage: number = 1;
    pageSize: number = 5;
    totalMaterials: number = 0;

    private apiUrl = 'http://localhost:5000/api/suppliers'; // API URL yang sama karena data material juga tersedia di endpoint ini

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadMaterials();
    }

    // Mengambil data material dari API
    loadMaterials(): void {
        this.http.get<any>(this.apiUrl).subscribe(
            (response) => {
                if (response.success && Array.isArray(response.data)) {
                    this.materials = response.data.map((item: any) => ({
                        material_code: item.material_code,
                        nama_material: item.nama_material
                    }));
                    this.totalMaterials = this.materials.length;
                    this.updatePagination();
                } else {
                    console.error('Format data tidak valid:', response);
                }
            },
            (error) => {
                console.error('Error fetching materials:', error);
            }
        );
    }

    // Memperbarui daftar material berdasarkan halaman
    updatePagination(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.paginatedMaterials = this.materials.slice(startIndex, startIndex + this.pageSize);
    }

    // Navigasi halaman sebelumnya
    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }

    // Navigasi halaman berikutnya
    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
        }
    }

    // Total halaman berdasarkan jumlah data
    get totalPages(): number {
        return Math.ceil(this.totalMaterials / this.pageSize);
    }
}
