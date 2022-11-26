import {Notify, QNotifyCreateOptions} from 'quasar';

export type historyItem = {
  data: string,
  value: number
}

export function notify( message: string, icon = 'error', color = '#323232', textColor = 'white', timeout = 10000, position: QNotifyCreateOptions['position'] = 'bottom', multiLine = false) {
  console.log(message)
  Notify.create({
    message,
    icon,
    color,
    textColor,
    multiLine,
    timeout,
    position,
    actions: [{
      label: '', color: textColor, icon: 'close', handler: () => { /***/
      }
    }]
  })
}

export function setLS<T>(name: string, data: T): T {
  localStorage[name] = JSON.stringify(data);
  return data;
}

export function getLS<T>(name: string, data_default: T | string = ''): T | string {
  if (localStorage[name] === undefined) return data_default;
  return JSON.parse(localStorage[name]);
}

export function themeColors (dark = false) {
  return{
    calc: dark? 'grey-2' : 'primary',
    hist: dark? 'grey-5' : 'grey-7',
    input: dark? 'grey-5' : 'primary',
    btn1: dark? {bg: 'grey-9', txt: 'white'} : {bg: 'grey-1', txt: 'black'},
    btn2: dark? {bg: 'grey-6', txt: 'black'} : {bg: 'grey-4', txt: 'black'},
    btn3: dark? {bg: 'orange-14', txt: 'white'} : {bg: 'orange-8', txt: 'white'},
    btn4: dark? {bg: 'grey-7', txt: 'white'} : {bg: 'primary', txt: 'white'},
    toggle: dark? 'orange' : 'grey',
    histDel: dark? 'grey-5' : 'grey-9',
    histItem: dark? 'blue-grey' : 'grey',
    histHead: dark? 'blue-grey' : 'grey',
  }
}
