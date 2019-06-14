import { Router } from '@angular/router';
import { LoggedService } from "./../login/logged.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private loggedService: LoggedService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.loggedService.logout();
    this.router.navigate(['/login']);
  }
}
