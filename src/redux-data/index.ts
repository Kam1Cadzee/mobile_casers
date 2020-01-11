import {combineReducers} from 'redux';
import transport from './transport';
import {ITransport} from '../typings/ITransport';

export interface RootState {
  transport: ITransportState;
}
export interface ITransportState {
  data: ITransport[];
  isLoading: boolean;
  error: any;
  snackbar: string;
}
export default combineReducers({
  transport,
});
