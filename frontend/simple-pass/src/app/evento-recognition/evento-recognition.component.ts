import { CameraService } from "app/camera/camera.service";
import { Evento } from "./../evento/evento.model";
import { EventoService } from "app/evento/evento.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsuarioService } from "../usuario/usuario.service";
import { Usuario } from "../usuario/usuario.model";
import { BehaviorSubject, Subject, of, Observable, timer } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd";
import {
  delay,
  tap,
  skip,
  concat,
  concatMap,
  map,
  switchMap,
  filter,
  takeUntil
} from "rxjs/operators";

export enum Status {
  BUSCANDO = "BUSCANDO",
  NAO_ENCONTRADO = "NAO_ENCONTRADO",
  ENCONTRADO = "ENCONTRADO",
  SELECIONE = "SELECIONE"
}

@Component({
  selector: "app-evento-recognition",
  templateUrl: "./evento-recognition.component.html",
  styleUrls: ["./evento-recognition.component.css"]
})
export class EventoRecognitionComponent implements OnInit {
  unsubscribe$ = new Subject();
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

  status = Status.SELECIONE;

  participantesEvento: Usuario[] = [];
  participantesEventoObject = {};
  participantesConfirmadosIds: string[] = [];
  participantesAConfirmarIds: string[] = [];

  painelHeader = "Selecione o evento";
  isPainelAtivo = false;

  constructor(
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private cameraService: CameraService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    this.eventoService.listAllEvents().subscribe(events => {
      this.eventos = events;
    });
    this.runDetectation();
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream; //window.URL.createObjectURL(stream);
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  atualizarEvento(eventoSelecionado: Evento) {
    this.eventoSelecionado = eventoSelecionado;
    this.totalParticipantes = eventoSelecionado.guests.length;
    this.totalParticipantesConfirmados = eventoSelecionado.guestsConfirmeds
      ? eventoSelecionado.guestsConfirmeds.length
      : 0;
    this.painelHeader = `${eventoSelecionado.desc} - Participantes - ${this
      .totalParticipantesConfirmados} de ${this
      .totalParticipantes} confirmados`;

    this.usuarioService
      .listUsersIn(eventoSelecionado.guests)
      .subscribe((users: Usuario[]) => {
        this.participantesEvento = users;
        const guestsConfirmeds = eventoSelecionado.guestsConfirmeds || [];
        this.participantesEvento.forEach(participante => {
          const isConfirmado = guestsConfirmeds.indexOf(participante.id) !== -1;
          if (isConfirmado) {
            participante.confirmed = true;
            this.participantesConfirmadosIds.push(participante.id);
          } else {
            this.participantesAConfirmarIds.push(participante.id);
          }
          this.participantesEventoObject[participante.id] = participante;
        });
      });
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
    return img;
  }

  validatePhoto(img: any): Observable<any> {
    if (img) {
      const image = img || this.userImage;
      const treatedImage = image.replace("data:image/png;base64,", "");
      return this.cameraService.detectFace(treatedImage);
    }
    return of({});
  }

  runDetectation() {
    const photoPolled$ = timer(0, 5000)
      .pipe(takeUntil(this.unsubscribe$))
      .pipe(
        filter(time => (this.eventoSelecionado ? true : false)),
        tap(() => {
          this.status = Status.BUSCANDO;
        }),
        switchMap(_ => of(this.capture())),
        switchMap(photo => this.validatePhoto(photo))
      );

    photoPolled$.subscribe(response => {
      if (response && response.FaceId) {
        const userImageId = response.ExternalImageId;
        const indice = this.participantesAConfirmarIds.indexOf(userImageId);
        if (indice !== -1) {
          this.participantesAConfirmarIds.splice(indice, 1);
          this.participantesConfirmadosIds.push(userImageId);
          this.participantesEvento
            .filter(e => e.id === userImageId)
            .forEach(e => (e.confirmed = true));
          const usuarioEncontrado = this.participantesEventoObject[userImageId]
            .name;
          this.notificationService.success(
            `Bem vindo(a) ${usuarioEncontrado}!`,
            "",
            { nzDuration: 4000, nzAnimate: true }
          );
          this.totalParticipantesConfirmados++;
          this.status = Status.ENCONTRADO;
        } else {
          this.status = Status.NAO_ENCONTRADO;
        }
      } else {
        this.status = Status.NAO_ENCONTRADO;
      }
    });
  }

  //   {
  //     BoundingBox: {Width: 0.29040199518203735, Height: 0.38398998975753784, Left: 0.3443030118942261,…}
  // Confidence: 100
  // ExternalImageId: "nicolasid"
  // FaceId: "986831a8-b4ae-487e-ab8e-2a8d6748c3b2"
  // ImageId: "2c33dbdf-364d-3cfd-aa33-69c2c7b4c5c9"
  //   }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
