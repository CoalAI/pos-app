export interface IRootState {
  root: boolean;
  version: string;
  error: any;
}

export interface DatesInterface {
  created?: Date;
  last_modified?: Date;
}