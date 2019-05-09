import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { Evento } from '../evento.model';
import { NzInputNumberModule } from 'ng-zorro-antd';

@Component({
  selector: 'evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  form: FormGroup
  numberPattern = /^[0-9]*$/

  formatterReal = (value: number) => `R$ ${value}`;
  parserReal = (value: string) => value.replace('R$ ', '');


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      desc: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      fullDesc: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      ticketValue: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      location: this.formBuilder.control('', Validators.required),
      dateTime: this.formBuilder.control('', Validators.required)
    })

    //this.form.patchValue({ title: 'banan' })
  }

  checkEvent(evento: Evento) {
    console.log(evento)
  }

}
