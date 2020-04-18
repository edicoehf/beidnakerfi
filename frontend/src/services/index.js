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

  if (isSuperUser && isSeller) {
    return sidebarButtons.SuperSeller;
  }
  if (isSuperUser && !isSeller) {
    return sidebarButtons.SuperBuyer;
  }
  if (!isSuperUser && isSeller) {
    return sidebarButtons.BasicSeller;
  }
  return sidebarButtons.BasicBuyer;
};

export const checkPrivileges = (path) => {
  const isSuperUser = JSON.parse(localStorage.getItem('tokens')).is_superuser;
  const isSeller = JSON.parse(localStorage.getItem('tokens')).org_seller;

  if (isSuperUser && isSeller) {
    if (views.superSeller.includes(path)) return true;
    return false;
  }
  if (isSuperUser && !isSeller) {
    if (views.superBuyer.includes(path)) return true;
    return false;
  }
  if (!isSuperUser && isSeller) {
    if (views.seller.includes(path)) return true;
    return false;
  }
  return false;
};

// eslint-disable-next-line consistent-return
export const getSidebarInfo = () => getButtons();
