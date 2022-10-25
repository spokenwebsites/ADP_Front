import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsEventsComponent } from './lists-events.component';

describe('ListsEventsComponent', () => {
  let component: ListsEventsComponent;
  let fixture: ComponentFixture<ListsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
