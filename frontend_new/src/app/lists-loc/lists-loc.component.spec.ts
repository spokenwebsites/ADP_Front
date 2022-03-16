import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsLocComponent } from './lists-loc.component';

describe('ListsLocComponent', () => {
  let component: ListsLocComponent;
  let fixture: ComponentFixture<ListsLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsLocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
