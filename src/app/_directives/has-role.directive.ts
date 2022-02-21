import { AccountService } from 'src/app/_services/account.service';
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user.model';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  user: User;
  constructor(private accountService: AccountService, private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>) {
      this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
        this.user = user;
      });
  }
  ngOnInit(): void {
    // Clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainer.clear();
      return;
    }
    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
