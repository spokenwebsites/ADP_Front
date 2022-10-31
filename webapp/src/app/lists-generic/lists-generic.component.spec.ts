import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsGenericComponent } from './lists-generic.component';

describe('ListsGenericComponent', () => {
  let component: ListsGenericComponent;
  let fixture: ComponentFixture<ListsGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsGenericComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
