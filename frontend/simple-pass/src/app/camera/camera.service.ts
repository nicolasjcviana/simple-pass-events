import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ENDPOINTS, BUCKET_NAME } from "./../app.api";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CameraService {
  constructor(private http: HttpClient) { }

  validateFace(img: string): Observable<any> {
    return this.http.post(`${ENDPOINTS.USER_IMAGE}`, img);
  }

  detecFace(img: string): Observable<any> {
    return this.http.post(`${ENDPOINTS.USER}/face/detect`, img);
  }

  sendPictureAndCompare(img: string, fileName: string): Observable<any> {
    return this.http.post(`${ENDPOINTS.UPLOAD_FILE_S3}/${fileName}`, img).pipe(
      switchMap(response => {
        console.log("File uploaded", response);
        return this.http.post(`${ENDPOINTS.ANALYSE_FACE}`, {
          bucket: BUCKET_NAME,
          imageName: img
        });
      })
    );
  }
}
