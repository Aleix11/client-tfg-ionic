import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltersBetsPage } from './modal-filters-bets.page';

describe('ModalFiltersBetsPage', () => {
  let component: ModalFiltersBetsPage;
  let fixture: ComponentFixture<ModalFiltersBetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiltersBetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFiltersBetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
