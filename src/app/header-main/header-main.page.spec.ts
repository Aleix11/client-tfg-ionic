import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainPage } from './header-main.page';

describe('HeaderMainPage', () => {
  let component: HeaderMainPage;
  let fixture: ComponentFixture<HeaderMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
