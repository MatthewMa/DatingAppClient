import { environment } from './../../environments/environment';
export class Constants {
  public static readonly BASE_URL = environment.apiUrl;
  public static readonly USER_URL = 'users';
  public static readonly ACCOUNT_LOGIN_URL = 'account/login';
  public static readonly ACCOUNT_REGISTER_URL = 'account/register';
  public static readonly PHOTO_UPLOAD_URL = "users/add-photo";
  public static readonly PHOTO_SET_MAIN_URL = "users/set-main-photo";
  public static readonly PHOTO_DELETE_URL = "users/delete-photo/";
  public static readonly LOCAL_STORAGE_USER_KEY = 'user';
  public static readonly LIKES_URL ='likes';
  public static readonly PREDICATE_PARAM = 'predicate';
  public static readonly UNAUTHORIZED_TEXT = 'Unauthorized';
  public static readonly STATUS_400_CODE = 400;
  public static readonly STATUS_401_CODE = 401;
  public static readonly STATUS_404_CODE = 404;
  public static readonly STATUS_500_CODE = 500;
}
