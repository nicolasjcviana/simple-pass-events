import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { HeaderComponent } from './header/header.component';
import { EventoFormComponent } from './evento/evento-form/evento-form.component';
import { EventoListComponent } from './evento/evento-list/evento-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/br';
import { FooterComponent } from './footer/footer.component';
import { HttpsRequestInterceptor } from './shared/interceptors/http-request.interceptor';
registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    HeaderComponent,
    EventoFormComponent,
    EventoListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
 //   { provide: NZ_I18N, useValue: pt_BR }
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpsRequestInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
