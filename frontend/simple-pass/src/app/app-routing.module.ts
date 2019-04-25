import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CameraComponent} from './camera/camera.component';

const routes: Routes = [
  // { path: '', component : AppComponent},
  { path: 'camera', component : CameraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { 


}
