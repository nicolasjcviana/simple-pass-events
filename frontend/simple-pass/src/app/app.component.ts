import { LoggedService } from "./login/logged.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private loggedService: LoggedService) {}

  isLogged() {
    return this.loggedService.isLogged();
  }
}
