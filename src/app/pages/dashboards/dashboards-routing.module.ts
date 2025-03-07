import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PdfComponent } from "./pdf/pdf.component";
import { CryptoComponent } from "./crypto/crypto.component";
import { ProjectsComponent } from "./projects/projects.component";
import { NftComponent } from "./nft/nft.component";
import { JobComponent } from './job/job.component';
import { SupplierInfoComponent } from './supplier-info/supplier-info.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MaterialComponent } from './material/material.component';
import { Path } from 'leaflet';
import { RawMaterialComponents } from './raw-material/raw-material.component';

const routes: Routes = [
  {
    path: "analytics",
    component: AnalyticsComponent
  },
  {
    path: "pdf",
    component: PdfComponent
  },
  {
    path: "crypto",
    component: CryptoComponent
  },
  {
    path: "projects",
    component: ProjectsComponent
  },
  {
    path: "nft",
    component: NftComponent
  },
  {
    path: "job",
    component: JobComponent
  },
  {
    path: "supplier-info",
    component: SupplierInfoComponent
  },
  {
    path: "supplier",
    component: SupplierComponent
  },
  {
    path: "material",
    component: MaterialComponent
  },
  {
    path: "raw-material",
    component: RawMaterialComponents
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
