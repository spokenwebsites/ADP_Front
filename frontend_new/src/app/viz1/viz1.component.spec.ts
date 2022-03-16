import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viz1Component } from './viz1.component';

describe('Viz1Component', () => {
  let component: Viz1Component;
  let fixture: ComponentFixture<Viz1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Viz1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Viz1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
