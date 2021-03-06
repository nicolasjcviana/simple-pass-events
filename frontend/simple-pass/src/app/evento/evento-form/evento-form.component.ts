import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { Evento } from '../evento.model';
import { NzInputNumberModule } from 'ng-zorro-antd';
import { UsuarioService } from 'app/usuario/usuario.service';
import { EventoService } from '../evento.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  form: FormGroup
  numberPattern = /^[0-9]*$/
  picure : string;

  formatterReal = (value: number) => `R$ ${value}`;
  parserReal = (value: string) => value.replace('R$ ', '');


  constructor(private formBuilder: FormBuilder,
    private service: EventoService,
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      desc: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      ticketValue: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      location: this.formBuilder.control('', Validators.required)
      // fullDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      // dateTime: this.formBuilder.control('', Validators.required)
    })

    //this.form.patchValue({ title: 'banan' })
  }
  onFileChanged(event) {
    var reader = new FileReader();
    
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    
    reader.onload = (event : any) => { // called once readAsDataURL is completed
      this.picure = event.target.result;
    }
  }

  checkEvent(evento: Evento) {
    evento.picture = this.picure;
    this.service.createEvent(evento)
      .subscribe(response =>{
        this.notification.success('Evento', 'Evento criado com sucesso!')
        this.router.navigate(["/evento-list"]);
      })
  }

}
