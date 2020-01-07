import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplyComponent } from './simply.component';

describe('SimplyComponent', () => {
  let component: SimplyComponent;
  let fixture: ComponentFixture<SimplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
