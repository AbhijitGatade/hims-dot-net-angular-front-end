import { Component } from '@angular/core';

@Component({
  selector: 'app-discharge-summary',
  standalone: false,
  templateUrl: './discharge-summary.component.html',
  styleUrl: './discharge-summary.component.scss'
})
export class DischargeSummaryComponent {
  NotYetDischargeVisible:any=true;
  routineVisible:any=false;
  DeathVisible:any=false;
  DAMAVisible:any=false;

  onDischargeAs(event:Event){
    const selectedDischargeAs=(event.target as HTMLSelectElement).value;
    console.log(selectedDischargeAs);

    if(selectedDischargeAs=="DAMA")
    {
      this.NotYetDischargeVisible=false;
  this.routineVisible=false;
  this.DeathVisible=false;
  this.DAMAVisible=true;

    }

    if(selectedDischargeAs=="NotYetDischarge")
      {

        this.NotYetDischargeVisible=true;
        this.routineVisible=false;
        this.DeathVisible=false;
        this.DAMAVisible=false;
  }

  if(selectedDischargeAs=="Routine")
    {

      this.NotYetDischargeVisible=false;
      this.routineVisible=true;
      this.DeathVisible=false;
      this.DAMAVisible=false;
}

if(selectedDischargeAs=="Death")
  {

    this.NotYetDischargeVisible=false;
    this.routineVisible=false;
    this.DeathVisible=true;
    this.DAMAVisible=false;
}

  }
}
