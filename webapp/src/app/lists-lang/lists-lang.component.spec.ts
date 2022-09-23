import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsLangComponent } from './lists-lang.component';

describe('ListsLangComponent', () => {
  let component: ListsLangComponent;
  let fixture: ComponentFixture<ListsLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
