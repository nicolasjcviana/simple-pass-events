import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { Usuario } from '../usuario.model';
import { NzProgressModule } from 'ng-zorro-antd';
import { UsuarioService } from '../usuario.service';
import { CameraService } from 'app/camera/camera.service';

@Component({
  selector: 'user-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  form: FormGroup
  numberPattern = /^[0-9]*$/
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  current = 0
  user: Usuario
  userImage: any
  percent = 0
  validPicture = false;
  pictureValidated = true;
  IMG_WIDTH = 400;
  IMG_HEIGHT = 380;

  @ViewChild("video")
  public video: ElementRef

  @ViewChild("canvas")
  public canvas: ElementRef

  formatterReal = (value: number) => `R$ ${value}`;
  parserReal = (value: string) => value.replace('R$ ', '');

  constructor(private formBuilder: FormBuilder,
    private service: UsuarioService,
    private cameraService: CameraService) {
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: this.formBuilder.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      telephone: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
    })

    //this.form.patchValue({ title: 'banan' })
  }

  public initVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        if (navigator.userAgent.indexOf('Firefox') > -1) {
          this.video.nativeElement.srcObject = stream;//window.URL.createObjectURL(stream);
        } else {
          console.log(stream)
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
        }
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, this.IMG_WIDTH, this.IMG_HEIGHT);
    let img = this.canvas.nativeElement.toDataURL("image/png");
    this.user.picture = img
    this.validatePhoto();
  }

  public validatePhoto() {
    this.pictureValidated = false;
    const treatedImage = this.user.picture.replace("data:image/png;base64,", "");
    this.cameraService.validateFace(treatedImage)
      .subscribe(res => {
        this.pictureValidated = true;
        const faceDetails = res[0];
        if (faceDetails.Confidence > 90) {
          this.validPicture = true;
          var ctx = this.canvas.nativeElement.getContext("2d");
          ctx.beginPath();
          ctx.lineWidth = "4";
          ctx.strokeStyle = "green";
          ctx.rect(faceDetails.BoundingBox.Left * this.IMG_WIDTH, faceDetails.BoundingBox.Top * this.IMG_HEIGHT,
            faceDetails.BoundingBox.Width * this.IMG_WIDTH, faceDetails.BoundingBox.Height * this.IMG_HEIGHT)
          ctx.stroke();
        }
      })
  }

  nextStep(user: Usuario) {
    this.current += 1
    this.initVideo()
    this.user = user
    console.log('PAGE 2')
  }

  goBack() {
    this.current -= 1;
  }

  finalStep() {
    this.service.createUser(this.user)
    .subscribe(res => {
      console.log(res);
    })
    this.current += 1
  }

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }
}
