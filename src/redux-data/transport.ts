import {IBaseActions, IBaseState} from './base/baseTypes';
import {CreatorReducer} from './base/base';
import service from '../services/service';
import {ITransportState, RootState} from './index';

interface ITransportActions extends IBaseActions {
  changeSnackbar: any;
}
const creator = new CreatorReducer<ITransportActions, ITransportState>(
  'transport',
);
creator.addAction('CHANGE_SNACKBAR', (state, action) => {
  return {...state, snackbar: action.payload};
});
const {setLoading, setError, setData, changeSnackbar} = creator.createActions();

const getTransportsFetch = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const res = await service.getTransports();
    dispatch(setData(res));
    return res;
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};

const getTransportById = (id: string) => (state: any) =>
  state.transport.data.find((item: any) => item.id === id)!;

const getTransportData = (state: RootState) => state.transport;

export {getTransportsFetch, getTransportById, getTransportData, changeSnackbar};

export default creator.createReducerFetch({
  data: [],
  isLoading: false,
  error: false,
  snackbar: '',
});
