import { RolesModalComponent } from './../../modal/roles-modal/roles-modal.component';
import { UserWithRole } from './../../_models/user-with-role.model';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  userWithRoles: UserWithRole[];
  bsModalRef?: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((users: UserWithRole[]) => {
      this.userWithRoles = users;
    });
    this.adminService.rolesSelectedChange.pipe(take(1)).subscribe((selectedRoles) => {
      this.userWithRoles[selectedRoles.row].roles = selectedRoles.roles;
    });
  }

  openModal(i: number) {
    const initialState = {
      list: this.userWithRoles[i].roles,
      title: 'Edit Roles',
      userName: this.userWithRoles[i].userName,
      row: i
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
