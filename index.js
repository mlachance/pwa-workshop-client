import {
  initialize,
  backButton
} from './core/router.js';
import Rooms from './pages/rooms.js';
import { Div } from './core/dom-api.js';


const asyncLoader = path => async params => {
  const module = await import(path);
  return module.default(params);
}

const container = document.querySelector('#container')

const routes = {
  '/': Rooms,
  '/chat': asyncLoader('./pages/chat.js'),
  '/roomInfo': asyncLoader('./pages/roomInfo.js'),
}

initialize(routes, container);


const nav = document.querySelector('#nav');
nav.appendChild(backButton);

const offlineStatusIndicator = new Div({
  className: 'offline'
}, 'Offline');

window.addEventListener('online', () => {
  nav.removeChild(offlineStatusIndicator);
});

window.addEventListener('offline', () => {
  nav.appendChild(offlineStatusIndicator);
});
