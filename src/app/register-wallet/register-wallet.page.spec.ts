import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWalletPage } from './register-wallet.page';

describe('RegisterWalletPage', () => {
  let component: RegisterWalletPage;
  let fixture: ComponentFixture<RegisterWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
