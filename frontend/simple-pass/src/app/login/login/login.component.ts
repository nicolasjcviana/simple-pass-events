import { Router } from "@angular/router";
import { LoggedService } from "./../logged.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isInvalid = false;
  constructor(
    private fb: FormBuilder,
    private loggedService: LoggedService,
    private router: Router
  ) {}

  submitForm(): void {
    this.isInvalid = false;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const value = this.validateForm.getRawValue();
      this.loggedService
        .login(value.userName, value.password)
        .subscribe((response: any) => {
          if (response.Count <= 0) {
            this.isInvalid = true;
          } else {
            this.router.navigate(["/evento-list"]);
          }
        });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
