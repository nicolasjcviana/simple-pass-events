import { CameraService } from "./camera.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import * as moment from "moment";
@Component({
  selector: "camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.css"]
})
export class CameraComponent implements OnInit {
  constructor(private cameraService: CameraService) {}

  @ViewChild("video") public video: ElementRef;

  @ViewChild("canvas") public canvas: ElementRef;

  public captures: Array<any>;

  public ngOnInit() {
    this.captures = [];
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

  public capture() {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    let img = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(img);
    this.sendPictureToBucketAndCompare(img);
  }

  public selectPicture() {}

  public sendPictureToBucketAndCompare(img: string) {
    const treatedImage = img.replace("data:image/png;base64,", "");
    this.cameraService
      .validateFace(treatedImage)
  }
}
