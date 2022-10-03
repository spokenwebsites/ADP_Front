import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz2Component } from './viz2.component';

describe('Viz2Component', () => {
  let component: Viz2Component;
  let fixture: ComponentFixture<Viz2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Viz2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
