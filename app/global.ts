import './assets/icons';
import './assets/styles/index.global.scss';
import './environment';
import { History, LocationState, createHashHistory } from 'history';

// https://github.com/ReactTraining/history/blob/v4/docs/GettingStarted.md
// https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components
// eslint-disable-next-line import/prefer-default-export
export const history: History<LocationState> = createHashHistory({
  basename: window.location.href
});
