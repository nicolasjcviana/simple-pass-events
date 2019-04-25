import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor() { }

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef

  public captures: Array<any>

  title = 'app works!';

  public ngOnInit() {
    this.captures = []
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        if (navigator.userAgent.indexOf('Firefox') > -1) {
          this.video.nativeElement.srcObject = stream;//window.URL.createObjectURL(stream);
        } else {
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
        }
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    let img = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(img);
  }

  public selectPicture(){
    
  }

  public sendPictureToBucketAndCompare(img : any){
    console.log(img)
    return img;
  }

}
