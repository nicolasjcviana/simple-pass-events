import { CameraService } from 'app/camera/camera.service';
import { Evento } from "./../evento/evento.model";
import { EventoService } from "app/evento/evento.service";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from "../usuario/usuario.service";
import { Usuario } from "../usuario/usuario.model";

@Component({
  selector: "app-evento-recognition",
  templateUrl: "./evento-recognition.component.html",
  styleUrls: ["./evento-recognition.component.css"]
})
export class EventoRecognitionComponent implements OnInit {
  current = 0;
  user: Usuario;
  userImage: any;
  percent = 0;
  validPicture = false;
  pictureValidated = true;
  IMG_WIDTH = 400;
  IMG_HEIGHT = 380;
  @ViewChild("video") public video: ElementRef;

  @ViewChild("canvas") public canvas: ElementRef;

  eventoSelecionado: any;
  eventos: Evento[] = [];
  totalParticipantes = 0;
  totalParticipantesConfirmados = 0;

  participantesEvento: Usuario[] = [];

  painelHeader = "Selecione o evento";
  isPainelAtivo = false;

  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private cameraService: CameraService
  ) {}

  ngOnInit() {
    this.eventoService.listAllEvents().subscribe(events => {
      this.eventos = events;
    });
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream; //window.URL.createObjectURL(stream);
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  atualizarEvento(eventoSelecionado: Evento) {
    this.totalParticipantes = eventoSelecionado.guests.length;
    this.totalParticipantesConfirmados = eventoSelecionado.guestsConfirmeds
      ? eventoSelecionado.guestsConfirmeds.length
      : 0;
    this.painelHeader = `Participantes - ${this
      .totalParticipantesConfirmados} de ${this
      .totalParticipantes} confirmados`;

    this.usuarioService
      .listUsersIn(eventoSelecionado.guests)
      .subscribe((users: Usuario[]) => {
        this.participantesEvento = users;
        if (eventoSelecionado.guestsConfirmeds) {
          this.participantesEvento.forEach(participante => {
            if (
              eventoSelecionado.guestsConfirmeds.indexOf(participante.id) !== -1
            ) {
              participante.confirmed = true;
            }
          });
        }
      });
  }

  public initVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        if (navigator.userAgent.indexOf("Firefox") > -1) {
          this.video.nativeElement.srcObject = stream; //window.URL.createObjectURL(stream);
        } else {
          console.log(stream);
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
        }
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(
        this.video.nativeElement,
        0,
        0,
        this.IMG_WIDTH,
        this.IMG_HEIGHT
      );
    let img = this.canvas.nativeElement.toDataURL("image/png");
    this.userImage = img;
    this.validatePhoto();
  }

  validatePhoto() {
    this.pictureValidated = false;
    const treatedImage = this.userImage.replace("data:image/png;base64,", "");
    this.cameraService.detecFace(treatedImage).subscribe(response => {
      console.log(response);
    })
  }
}
