import AsyncStorage from '@react-native-community/async-storage';
import service from './service';
import {changeSnackbar} from '../redux-data/transport';

const KEY = 'PROBA1';

interface IData {
  id: string | null;
  data: any;
}

const saveData = async (id: string | null, data: any) => {
  let res: any = await AsyncStorage.getItem(KEY);

  if (res) {
    res = JSON.parse(res);
    res.push({
      id,
      data,
    });
  } else {
    res = [
      {
        id,
        data,
      },
    ];
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(res));
};

const fetchData = async (dispatch: any) => {
  let res: any = await AsyncStorage.getItem(KEY);
  await AsyncStorage.setItem(KEY, '');

  if (res) {
    const array: IData[] = JSON.parse(res);
    array.forEach(item => {
      if (item.id) {
        service.updateTransport(item.id, item.data);
      } else {
        service.addTransport(item.data);
      }
    });
    dispatch(changeSnackbar('Збережені дані були відправленні'));
  }
};

export default {
  saveData,
  fetchData,
};
