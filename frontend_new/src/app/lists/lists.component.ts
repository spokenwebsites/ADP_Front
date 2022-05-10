import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Alphabets=[
    {letter:'A'},
    {letter:'B'},
    {letter:'C'},
    {letter:'D'},
    {letter:'E'},
    {letter:'F'},{letter:'G'},{letter:'H'},{letter:'I'},{letter:'J'},{letter:'K'},{letter:'L'},{letter:'M'},{letter:'N'},{letter:'O'},
    {letter:'P'},
    {letter:'Q'},
    {letter:'R'},
    {letter:'S'},
    {letter:'T'},
    {letter:'U'},
    {letter:'V'},
    {letter:'W'},
    {letter:'X'},
    {letter:'Y'},
    {letter:'Z'}
  ];
  Authors= [
    { name: 'JasonCamlot' },
    { name: 'Ferrier Ian' },
    { name: 'Gulliver Roland'},
    { name: 'Prevost Adele Elise'},
    { name: 'Wint Brandon'},
    { name: 'Yalaoui Malek'},
    { name: 'Martonfi Ilona'},
    {name:'McCrum Rachel'},
    {name:'Pennock Tyler'},
    {name:'Lieberman Moti'},
    { name: 'Gulliver Roland'},
    { name: 'Prevost Adele Elise'},
    { name: 'Wint Brandon'},
    { name: 'Yalaoui Malek'},
    { name: 'Martonfi Ilona'},
    {name:'McCrum Rachel'},
    {name:'Pennock Tyler'},
    {name:'Lieberman Moti'},
    { name: 'Gulliver Roland'},
    { name: 'Prevost Adele Elise'},
    { name: 'Wint Brandon'},
    { name: 'Yalaoui Malek'},
    { name: 'Martonfi Ilona'},
    {name:'McCrum Rachel'},
    {name:'Pennock Tyler'},
    {name:'Lieberman Moti'}

    


  ];
}

interface Authors {
  name: string;
  
 
}
interface Alphabets{
  letter:string;
}
