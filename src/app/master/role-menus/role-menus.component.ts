import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-role-menus',
  standalone: false,
  templateUrl: './role-menus.component.html',
  styleUrl: './role-menus.component.scss'
})
export class RoleMenusComponent implements OnInit {
roleid:any;
roleresult:any;
menuresult:any=[];
selectedMenus: any= [];
formdata:any;
result:any;
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.roleid = this.route.snapshot.paramMap.get('roleid');
    // console.log(this.roleid);
    this.bind();
  }
 
  bind(){
      this.formdata = new FormGroup({
          id: new FormControl(0),
           name: new FormControl(""),
           menuid: new FormArray([])
        });
    this.api.get("api/Roles/"+this.roleid).subscribe((result: any) => {
            // console.log(result);
            this.roleresult = result;
             if (this.roleresult) {
        this.formdata.patchValue({
          name: this.roleresult.name, // Patch the fetched value
        });
      }
        });
        
        this.api.get("api/Menus").subscribe((result: any) => {
          // console.log(result);
          this.menuresult = result;
          console.log(this.menuresult)
      });
  }

  save()
  {
  
     console.log("cyxi"); 
    //  console.log("Selected Menus:", this.formdata.get('menuid')?.value);
  }


  

  // Handle the checkbox selection changes
    get menuidControls() {
    return (this.formdata.get('menuid') as FormArray).controls;
  }

  // Handle the checkbox selection changes
  onMenuChange(menuId: number, isChecked: boolean) {
    const menuidArray = this.formdata.get('menuid') as FormArray;
    if (isChecked) {
      // Add the menu ID to the FormArray if checked
      menuidArray.push(new FormControl(menuId));
    } else {
      // Remove the menu ID from the FormArray if unchecked
      const index = menuidArray.controls.findIndex(ctrl => ctrl.value === menuId);
      if (index >= 0) {
        menuidArray.removeAt(index);
      }
    }
  }


  
}

//   onMenuChange(menuId: number) {
//     const index = this.selectedMenus.indexOf(menuId);
//     if (index === -1) {
//       this.selectedMenus.push(menuId); // Add menu ID if checked
//     } else {
//       this.selectedMenus.splice(index, 1); // Remove menu ID if unchecked
//     }
//   }
// }


