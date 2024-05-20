export interface IErrorObj {
  [key: string]: { statusCode: number; message: string };
}

export interface IProfile {
  userId?: String;
  username?: String;
  avatar?: String;
  cover?: String;
  bio?: String;
}
