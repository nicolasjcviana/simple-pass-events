import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { EventoFormComponent } from './evento/evento-form/evento-form.component';
import { EventoListComponent } from './evento/evento-list/evento-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';

const routes: Routes = [
  // { path: '', component : AppComponent},
  { path: 'camera', component: CameraComponent },
  { path: 'evento-form/:id', component: EventoFormComponent },
  { path: 'evento-list', component: EventoListComponent },
  { path: 'user-form/:id', component: UsuarioFormComponent },
  { path: 'user-list', component: UsuarioListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
