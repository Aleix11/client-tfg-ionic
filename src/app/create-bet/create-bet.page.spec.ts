import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBetPage } from './create-bet.page';

describe('CreateBetPage', () => {
  let component: CreateBetPage;
  let fixture: ComponentFixture<CreateBetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
