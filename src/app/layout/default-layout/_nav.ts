import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    iconComponent: {name: 'cil-spreadsheet'},
    url: '/dashboard',
  },
  {
    name: 'Settings',
    url: '/settings',
    iconComponent: {name: 'cil-settings'},
  }
];
