/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetNoOperationListComponent } from './get-no-operation-list.component';

describe('GetNoOperationListComponent', () => {
  let component: GetNoOperationListComponent;
  let fixture: ComponentFixture<GetNoOperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNoOperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNoOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
