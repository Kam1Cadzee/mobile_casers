import {createActions, handleActions} from 'redux-actions';
import {IAction, IBaseActions, IBaseState} from './baseTypes';

export class CreatorReducer<T = IBaseActions, TState = IBaseState> {
  private initState: IBaseState = {
    data: undefined,
    error: false,
    isLoading: false,
  };
  private readonly options: any;
  private actions?: T;
  private actionMap: any;
  private reducerMap: any;

  constructor(private prefix: string) {
    this.options = {
      prefix: this.prefix,
    };
    this.actionMap = {};
    this.reducerMap = {};
  }

  private getCamelCase = (name: string) => {
    const arr = name.toLowerCase().split('_'); //set_reg_city
    let str = arr[0];
    for (let i = 1; i < arr.length; i += 1) {
      let item = arr[i];
      item = item[0].toUpperCase() + item.substr(1);
      str += item;
    }
    return str;
  };

  public addAction = (
    name: string | any,
    reducer: (state: TState, action: IAction) => TState,
    func: any = (value: any) => value,
  ) => {
    if (typeof name === 'string') {
      this.actionMap[name] = func;
      this.reducerMap[this.getCamelCase(name)] = reducer;
    } else this.reducerMap[name] = reducer;
  };

  public createActions: () => T = () => {
    if (!this.actions) {
      this.actions = createActions(
        this.actionMap,
        ...['SET_LOADING', 'SET_DATA', 'SET_ERROR'],
        this.options,
      ) as any;
    }
    return this.actions!;
  };

  public createReducerFetch = (initState?: any) => {
    const {setLoading, setData, setError, ...rest}: any = this.createActions();
    const maps: any = {};
    Object.keys(this.reducerMap).forEach(key => {
      const name = rest[key];
      if (name) maps[name] = this.reducerMap[key];
      else maps[key] = this.reducerMap[key];
    });

    return handleActions<IBaseState, any>(
      {
        [setLoading]: (state, action) => {
          return {...state, isLoading: action.payload};
        },
        [setData]: (state, action) => {
          return {...state, data: action.payload, error: false};
        },
        [setError]: (state, action) => {
          return {...initState, error: action.payload};
        },
        ...maps,
      },
      initState || this.initState,
    );
  };

  public createReducer = (initState: TState) => {
    const actions: any = this.createActions();

    const maps: any = {};
    Object.keys(this.reducerMap).forEach(key => {
      const name = actions[key];
      if (name) maps[name] = this.reducerMap[key];
      else maps[key] = this.reducerMap[key];
    });

    return handleActions(maps, initState, this.options);
  };
}
