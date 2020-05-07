import { sidebarButtons, views } from '../config';

export const isEmpty = (x) => x === ''
  || (!x && typeof x !== 'number')
  || (Object.entries(x).length === 0 && x.constructor === Object)
  || (x && x.length === 0);

export const getButtons = () => {
  try {
    JSON.parse(localStorage.getItem('tokens'));
  } catch (e) {
    return false;
  }

  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;
  const isManager = JSON.parse(localStorage.getItem('tokens')).is_manager;

  if (isSuperUser && isSeller) {
    return sidebarButtons.SuperSeller;
  }
  if (isSuperUser && !isSeller) {
    return sidebarButtons.SuperBuyer;
  }
  if (isManager && !isSeller) {
    return sidebarButtons.DepartmentManager;
  }
  if (!isSuperUser && isSeller) {
    return sidebarButtons.BasicSeller;
  }
  return sidebarButtons.BasicBuyer;
};

export const checkPrivileges = (path) => {
  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;
  const isManager = JSON.parse(localStorage.getItem('tokens')).is_manager;

  if (isSuperUser && isSeller) {
    if (views.superSeller.includes(path)) return true;
    return false;
  }
  if (isSuperUser && !isSeller) {
    if (views.superBuyer.includes(path)) return true;
    return false;
  }
  if (isManager && !isSeller) {
    if (views.departmentManager.includes(path)) return true;
  }
  if (!isSuperUser && isSeller) {
    if (views.seller.includes(path)) return true;
    return false;
  }
  return false;
};

// eslint-disable-next-line consistent-return
export const getSidebarInfo = () => getButtons();

export const sortBy = (list, item, subItem = '', setDesc, desc) => {
  let A; let
    B;
  return list.sort((a, b) => {
    if (subItem !== '') {
      A = a[item] ? a[item][subItem].toUpperCase() : 'xxxxxxxxxxx';
      B = b[item] ? b[item][subItem].toUpperCase() : 'xxxxxxxxxxx';
    } else {
      A = typeof a[item] === 'string' ? a[item].toUpperCase() : a[item]; // ignore upper and lowercase
      B = typeof b[item] === 'string' ? b[item].toUpperCase() : b[item]; // ignore upper and lowercase
    }
    if (desc) {
      setDesc(false);
      if (A < B) return -1;
      return 1;
    }
    setDesc(true);
    if (A > B) return -1;
    return 1;
  });
};
