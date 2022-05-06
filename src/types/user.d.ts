export type User = {
  id: string;
  first_name: string;
  last_name: string;
  paid: boolean;
  email: string;
  faculty: string;
  quest_id: string;
  created_at: Date;
  semester_id: string;
};

export type GetUserResponse = {
  user: User;
}

export type ListUsersResponse = {
  users: User[];
}