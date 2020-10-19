/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetReportDataPassComponent } from './get-report-data-pass.component';

describe('HomeComponent', () => {
  let component: GetReportDataPassComponent;
  let fixture: ComponentFixture<GetReportDataPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetReportDataPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReportDataPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
