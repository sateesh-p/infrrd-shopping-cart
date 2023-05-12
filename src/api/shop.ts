import { items } from './items';
import { of, delay } from 'rxjs';

const TIMEOUT = 100;

export default {
  getItems() {
    return of(items)
      .pipe(delay(TIMEOUT));
  },
}
