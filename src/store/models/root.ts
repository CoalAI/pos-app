export interface IRootState {
  root: boolean;
  version: string;
  error: any;
  online: Boolean;
}

export interface DatesInterface {
  created?: Date;
  last_modified?: Date;
}