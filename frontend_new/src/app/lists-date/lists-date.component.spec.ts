import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsDateComponent } from './lists-date.component';

describe('ListsDateComponent', () => {
  let component: ListsDateComponent;
  let fixture: ComponentFixture<ListsDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
