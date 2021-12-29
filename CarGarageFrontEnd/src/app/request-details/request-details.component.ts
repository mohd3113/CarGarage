import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../_models/request';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  request:Request;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(date => {
      this.request = date['request'];
    });
  }

}
