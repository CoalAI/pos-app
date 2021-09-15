export interface IRootState {
  root: boolean;
  version: string;
  error: any;
  sync: boolean;
  offlineMode: boolean;
}

export interface DatesInterface {
  created?: Date;
  last_modified?: Date;
}