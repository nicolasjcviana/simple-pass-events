import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoRecognitionComponent } from './evento-recognition.component';

describe('EventoRecognitionComponent', () => {
  let component: EventoRecognitionComponent;
  let fixture: ComponentFixture<EventoRecognitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoRecognitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
