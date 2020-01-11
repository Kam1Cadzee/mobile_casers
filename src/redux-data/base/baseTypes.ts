export interface IBaseState {
  data?: any;
  isLoading: boolean;
  error: any;
}

export interface IBaseActions {
  setLoading: any;
  setData: any;
  setError: any;
}

export interface IAction {
  payload: any;
  error: boolean;
  type: string;
}
