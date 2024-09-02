import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})




export class AppComponent implements OnInit{
  title = 'HELLO HELLO !!!';

  constructor(private router:Router) {

  }

  ngOnInit(): void {
  }
  onAbout(){
    this.router.navigate(['about'])
  }
  info = {
    name : 'hamza',
    email : 'hamza.net',
    tele : '07-07'
  }

  // type quiqo : {id = number, message = string};
  commenta = {date :null, message : ''}
  //@ts-ignore
  comments :commenta[] = [];


  addcomment(){
    if (this.commenta.message !== ''){
      // @ts-ignore
      this.commenta.date = new Date();
      this.comments.push(
        {

          date : this.commenta.date,
          message : this.commenta.message

        }
      );
    }
  }
}
