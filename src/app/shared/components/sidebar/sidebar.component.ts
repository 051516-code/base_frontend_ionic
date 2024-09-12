import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {
@Input() user: any;
@Input() isAuthenticated : boolean = false; 

  constructor(
    private router : Router
  ) { }

  ngOnInit() {}

  goToMap(){}
  goToCompanyMode(){}
}
