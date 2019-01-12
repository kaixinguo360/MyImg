import { Order } from './order';

export const appConfig = {
  apiURL: '/api',
  fileURLRoot: '/file',
  mobileWidth: 640,
  columnWidth: 250,
  defaultOrder: Order.TIME_DESC,
  enableLogger: false
};
