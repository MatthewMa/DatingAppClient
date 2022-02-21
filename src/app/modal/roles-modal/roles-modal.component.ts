import { AdminService } from './../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/_constants/constants';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  userName: string;
  row: number;
  list: any[] = [];
  // TODO: Get roles from backend
  roles: string[] = Constants.ROLES;
  selectedRoles = this.list;
  constructor(public bsModalRef: BsModalRef, private toastr: ToastrService, private adminService: AdminService) { }

  ngOnInit(): void {}

  onEditRolesSave() {
    console.log(this.selectedRoles);
    if (this.selectedRoles.length > 0) {
      this.adminService.editRoles(this.userName, this.selectedRoles.join(',')).subscribe((response) => {
        // Emit role changed event
        this.adminService.rolesSelectedChange.next({
          row: this.row,
          roles: this.selectedRoles
        });
        this.toastr.success('You have changed the roles successfully.');
        this.bsModalRef.hide();
      });
    } else {
      this.toastr.error('You must select at least a role.');
    }
  }

  roleSelected(event, role) {
    if (event.target.checked) {
      if (!this.selectedRoles.includes(role)) {
        this.selectedRoles.push(role);
      }
    } else {
      if (this.selectedRoles.includes(role)) {
        this.selectedRoles.splice(this.selectedRoles.indexOf(role), 1);
      }
    }
  }

}
