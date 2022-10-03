import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { of } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  // @ViewChild('sidenav') public sidenav!: MatSidenav |any;
  @Input() sidenavLayout:any;

  constructor() { 
  }
  ngOnInit() {
  
    }
    organizations= [
      { name: 'HTML', selected: false, disabled: false },
      { name: 'CSS', selected: false, disabled: false },
      { name: 'JavaScript', selected: false, disabled: false }
    ];

    People= [
      { name: 'Jason Christie', selected: false, disabled: false },
      { name: 'Laura Zacharin', selected: false, disabled: false },
      { name: 'Jason', selected: false, disabled: false }
    ];
    Typeofevents= [
      { name: 'Workshop', selected: false, disabled: false },
      { name: 'Book Launch', selected: false, disabled: false },
      { name: 'Reading', selected: false, disabled: false }
    ];
    Places= [
      { name: 'Montreal', selected: false, disabled: false },
      { name: 'Laval', selected: false, disabled: false },
      { name: 'Toronto', selected: false, disabled: false }
    ];
    Recordings= [
      { name: 'Yes', selected: false, disabled: false },
      { name: 'No', selected: false, disabled: false },
      { name: 'JavaScript', selected: false, disabled: false }
    ];
    Dates= [
      { name: 'March, 2021', selected: false, disabled: false },
      { name: 'November, 2020', selected: false, disabled: false },
      { name: 'July, 2021', selected: false, disabled: false }
    ];

  opened=false;
  panelOpenState = false;

  
  

}

interface organizations {
  name: string;
  selected: boolean;
  disabled: boolean;
 
}
interface People{
  name: string;
  selected: boolean;
  disabled: boolean;
}
interface Typeofevents{
  name: string;
  selected: boolean;
  disabled: boolean;
}
interface Places{
  name: string;
  selected: boolean;
  disabled: boolean;
}
interface Recordings{
  name: string;
  selected: boolean;
  disabled: boolean;
}
interface Dates{
  name: string;
  selected: boolean;
  disabled: boolean;
}

