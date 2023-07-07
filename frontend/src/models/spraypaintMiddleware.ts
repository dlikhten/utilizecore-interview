import { MiddlewareStack } from 'spraypaint';
import { requireLogin } from 'store/reducers/login';
import { mainStore } from 'store/store';

const headers = ['access-token', 'token-type', 'client', 'expiry', 'uid'];

const spraypaintMiddleware = new MiddlewareStack(
  [
    (url, options) => {
      // @ts-ignore
      options.headers!['current-email'] = mainStore.getState().login.currentEmail; // put email here
    },
  ],
  [
    (response, json) => {
      if (response.status === 401) {
        mainStore.dispatch(requireLogin());
        throw 'abort';
      }
    },
  ]
);

export default spraypaintMiddleware;
