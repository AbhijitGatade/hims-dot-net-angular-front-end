import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-ipd-company-service-rates',
  standalone: false,
  templateUrl: './ipd-company-service-rates.component.html'
})

export class IpdCompanyServiceRatesComponent implements OnInit {

  companies: any;
  categories: any;

  companyid = 0;
  categoryid = 0;
  searchQuery: string = '';

  result: any[] = [];
  filteredResult: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('api/companies').subscribe((result: any) => {
      this.companies = result;
    });

    this.api.get('api/ipdservicecategories').subscribe((result: any) => {
      this.categories = result;
    });
    this.bind();
  }

  bind() {
    if (this.companyid == 0) {
      this.result = [];
      this.filteredResult = [];
    } else {
      this.api.get(`api/ipdcompanyservicerates/${this.companyid}`).subscribe(
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
      return row;
    });
    this.api.post('api/ipdcompanyservicerates/' + this.companyid, data).subscribe((result:any)=>{
      this.api.showSuccess("Rates saved successfully");
      this.bind();
    });
  }

  filterData() {
    // Perform filtering on name, defaultrate, and rate
    this.filteredResult = this.result.filter((row: any) => {
      if (row.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        if (this.categoryid != 0) {
          if (row.ipdservicecategoryid == this.categoryid) {
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
