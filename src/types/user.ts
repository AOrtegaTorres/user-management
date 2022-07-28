export type User = {
  avatar?: string;
  firstName: string;
  lastName: string;
  emailId: string;
};

export type UserList = {
  userList: User[];
};
