import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // values:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  // this.getValues();
  }

  registerToggle(){
    this.registerMode = true;
  }
  /*
  getValues(){
    this.http.get('http://localhost:5000/api/test/getTest').subscribe(response => {
      this.values = response;
    }, error =>{
      console.log(error);
    });
  }
  */
  cancelRegisterMode(registerMode : boolean){
    this.registerMode = registerMode;
  }
}
