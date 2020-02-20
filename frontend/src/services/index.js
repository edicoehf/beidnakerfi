export const undefinedCheck = (x) => typeof(x) === 'undefined';

export const loginCheck = (x) => {

}
export const isEmpty = (x) => x === '' || (!x && typeof (x) !== 'number')
  || (Object.entries(x).length === 0 && x.constructor === Object)
  || (x && x.length === 0);
