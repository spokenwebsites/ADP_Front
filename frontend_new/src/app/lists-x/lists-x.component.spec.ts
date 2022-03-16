import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsXComponent } from './lists-x.component';

describe('ListsXComponent', () => {
  let component: ListsXComponent;
  let fixture: ComponentFixture<ListsXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
