import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Set iframe source';
  url: string = "https://angular.io/api/router/RouterLink";
  urlSafe: SafeResourceUrl | undefined;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
  showDiv = {
    viz1 : false,
    viz2 : false,
    viz3 : false
  }

}

function showCrtl($scope: { showCon: (con: any) => void; clickOn: any; }){
  console.log("showcon")
  $scope.showCon=function(con){
      $scope.clickOn=con;
  }
}
