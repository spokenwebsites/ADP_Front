import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz3Component } from './viz3.component';

describe('Viz3Component', () => {
  let component: Viz3Component;
  let fixture: ComponentFixture<Viz3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Viz3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
