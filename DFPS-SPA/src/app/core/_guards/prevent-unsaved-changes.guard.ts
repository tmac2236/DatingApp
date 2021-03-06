import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from 'src/app/views/members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent){
      if(component.editForm.dirty){
          return confirm('Are tou sure you want to continue? Any unchanges will be lost');
      }
      return true;
  }

}
