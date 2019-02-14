import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderPage } from './leader.page';

describe('LeaderPage', () => {
  let component: LeaderPage;
  let fixture: ComponentFixture<LeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
