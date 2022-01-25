import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { Observable, take } from 'rxjs';
import { AccountService } from './../../_services/account.service';
import { Constants } from 'src/app/_constants/constants';
import { Member } from './../../_models/member.model';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User } from 'src/app/_models/user.model';
import { Photo } from 'src/app/_models/photo.model';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = Constants.BASE_URL;
  token: string;
  user: User;
  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.token = user.token;
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + Constants.PHOTO_UPLOAD_URL,
      authToken: 'Bearer ' + this.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if (photo.isMain) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  setMainPhoto(photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.toastr.success("Set main photo successfully", "Set main photo");
      // Set user info
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUserAndLocalStoragte(this.user);
      // Set member info
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.id === photo.id)
          p.isMain = true;
        else
          p.isMain = false;
      });
    });
  }

  onDeletePhoto(photo) {
    if (photo.isMain) {
      if (!confirm("Are you sure to delete the photo since it is a main photo"))
        return;
    }
    this.memberService.deletePhoto(photo.id).subscribe(() => {
      this.toastr.success("Delete photo successfully", "Delete photo");
      if (photo.isMain) {
        this.user.photoUrl = null;
        this.accountService.setCurrentUserAndLocalStoragte(this.user);
      }
      this.member.photos.splice(this.member.photos.indexOf(photo), 1);
    });
  }
}
