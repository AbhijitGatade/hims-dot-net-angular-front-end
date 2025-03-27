import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-opd-company-doctor-service-rates',
  standalone: false,
  templateUrl: './opd-company-doctor-service-rates.component.html'
})

export class OpdCompanyDoctorServiceRatesComponent implements OnInit {

  companies: any;
  doctors:any;
  categories: any;

  companyid = 0;
  doctorid = 0;
  categoryid = 0;
  searchQuery: string = '';

  result: any[] = [];
  filteredResult: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('api/companies').subscribe((result: any) => {
      this.companies = result;
    });
    this.api.get('api/doctors').subscribe((result: any) => {
      this.doctors = result;
    });
    this.api.get('api/opdservicecategories').subscribe((result: any) => {
      this.categories = result;
    });
    this.bind();
  }

  bind() {
    if (this.companyid == 0 || this.doctorid == 0) {
      this.result = [];
      this.filteredResult = [];
    } else {
      this.api.get(`api/opdcompanyservicerates/${this.companyid}/${this.doctorid}`).subscribe(
        (result: any) => {
          this.searchQuery = "";
          this.categoryid = 0;
          this.result = result;
          this.filteredResult = result;
        },
        (error) => {
          console.error('Error fetching rates:', error);
        }
      );
    }
  }

  saveAll(): void {
    let data = this.filteredResult.map((row: any) => {
      if (row.rate == null) {
        row.rate = 0;
      }
      if (row.frate == null) {
        row.frate = 0;
      }
      return row;
    });
    this.api.post('api/opdcompanyservicerates/' + this.companyid + '/' + this.doctorid, data).subscribe((result:any)=>{
      this.api.showSuccess("Rates saved successfully");
      this.bind();
    });
  }

  filterData() {
    // Perform filtering on name, defaultrate, and rate
    this.filteredResult = this.result.filter((row: any) => {
      if (row.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        if (this.categoryid != 0) {
          if (row.opdservicecategoryid == this.categoryid) {
            return row;
          }
        } else {
          return row;
        }
      }
    }
    );
  }
}
