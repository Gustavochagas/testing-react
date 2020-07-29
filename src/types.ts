export type IAllInformations = {
  data: Array<IUser>;
  loading: boolean;
  error: boolean;
}

export type IUser = {
  _id: string;
  name: string;
  active: boolean;
}
