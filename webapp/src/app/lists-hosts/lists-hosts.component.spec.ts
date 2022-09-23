import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsHostsComponent } from './lists-hosts.component';

describe('ListsHostsComponent', () => {
  let component: ListsHostsComponent;
  let fixture: ComponentFixture<ListsHostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsHostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsHostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
