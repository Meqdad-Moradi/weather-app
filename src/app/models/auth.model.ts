export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IStoredUser {
  id: string;
  username: string;
  email: string;
}
