import { OPENEXCHANGERATES_APP_ID } from '@utils/Constants';

class Api {
  baseUrl = 'https://openexchangerates.org/api';
  getLatestCurrencyRatesUSDBased = async () => {
    const res = await fetch(this.baseUrl + `/latest.json?app_id=${OPENEXCHANGERATES_APP_ID}`);

    if (res.ok) {
      return await res.json();
    } else {
      const err = await res.json();
      throw new Error(err.message || 'Unknown error');
    }
  };
}

export default new Api();
