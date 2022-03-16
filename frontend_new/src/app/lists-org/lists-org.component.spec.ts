import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsOrgComponent } from './lists-org.component';

describe('ListsOrgComponent', () => {
  let component: ListsOrgComponent;
  let fixture: ComponentFixture<ListsOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
