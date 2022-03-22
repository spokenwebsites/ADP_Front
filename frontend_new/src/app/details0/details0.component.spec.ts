import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Details0Component } from './details0.component';

describe('Details0Component', () => {
  let component: Details0Component;
  let fixture: ComponentFixture<Details0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Details0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Details0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
