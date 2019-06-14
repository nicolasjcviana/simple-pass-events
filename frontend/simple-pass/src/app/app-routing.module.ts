import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { CameraComponent } from "./camera/camera.component";
import { EventoFormComponent } from "./evento/evento-form/evento-form.component";
import { EventoListComponent } from "./evento/evento-list/evento-list.component";
import { UsuarioFormComponent } from "./usuario/usuario-form/usuario-form.component";
import { UsuarioListComponent } from "./usuario/usuario-list/usuario-list.component";
import { LoginComponent } from "./login/login/login.component";
import { LoggedGuard } from "./login/logged.guard";

const routes: Routes = [
  { path: "camera", component: CameraComponent, canActivate: [LoggedGuard] },
  {
    path: "evento-form/:id",
    component: EventoFormComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: "evento-list",
    component: EventoListComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: "user-form/:id",
    component: UsuarioFormComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: "user-list",
    component: UsuarioListComponent,
    canActivate: [LoggedGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent }
  // { path: '', component : AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
