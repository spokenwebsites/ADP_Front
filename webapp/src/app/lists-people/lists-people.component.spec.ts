import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsPeopleComponent } from './lists-people.component';

describe('ListsPeopleComponent', () => {
  let component: ListsPeopleComponent;
  let fixture: ComponentFixture<ListsPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
