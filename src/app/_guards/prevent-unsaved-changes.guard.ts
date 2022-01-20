import { Observable } from 'rxjs';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MemberEditComponent): boolean {
    if (component.tabForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }
    return true;
  }

}
