import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import { stat } from 'fs';
declare function Calljsfile(csv: event[],json: any[]): any;
declare function send_json_to_map_js_file(json: any):any ;
  

// declare the javascript function here


@Component({
  selector: 'app-viz3',
  templateUrl: './viz3.component.html',
  styleUrls: ['./viz3.component.css']
})


export class Viz3Component implements OnInit {

 

  ngOnInit(): void {
   // this.loadJsFile("https://cdnjs.cloudflare.com/ajax/libs/d3/7.3.0/d3.min.js");
   
    this.loadJsFile("assets/js/d3.min.js");
    this.loadJsFile("assets/js/d3.v4.js")
    this.loadJsFile("assets/js/d3-geo-projection.v2.min.js")
    this.loadJsFile("assets/js/d3-scale-chromatic.v1.min.js")
    //this.loadJsFile("assets/js/map.js");
   
  }


  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public json_array:Array<any>=[]
  public eventArray: event[] = [];
  

 
  constructor(private http: HttpClient){
    this.http.get<any>('assets/js/canadageo.json')
    .subscribe(
      
        data => {
            this.json_array=data;
            this.http.get('assets/js/final.csv', {responseType: 'text'})
                .subscribe(
                    data => {
                        let csvToRowArray = data.split("\n");
                        for (let index = 1; index < csvToRowArray.length - 1; index++) {
                          let row = csvToRowArray[index].split(",");
                          this.eventArray.push(new event( row[0], parseInt(row[1]), parseInt(row[2]), row[3],row[4],parseInt(row[5])));
                        }
                        Calljsfile(this.eventArray,this.json_array);
                    
                    },
                    error => {
                        console.log(error);
                    }
                );
          //  send_json_to_map_js_file(csvToRowArray);
        },
        error => {
            console.log(error);
        }
    );


    

    
  }

}


export class event{
  city: String;
  homelat: number;
  homelon: number;
  homecontinent:String;
  state:String;
  n:number;

  constructor(city: String, homelat: number, homelon: number, homecontinent:String,state:String,n:number){
    this.city = city;
    this.homelat = homelat;
    this.homelon = homelon;
    this.homecontinent=homecontinent;
    this.state=state;
    this.n=n;
  }
}
