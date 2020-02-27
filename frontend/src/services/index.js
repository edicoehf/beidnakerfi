import { views } from '../config'
export const isEmpty = (x) => x === '' || (!x && typeof (x) !== 'number')
  || (Object.entries(x).length === 0 && x.constructor === Object)
  || (x && x.length === 0);

export const checkGroups = (path) => {
  const { allowedGroups } = views[path]
  console.log(allowedGroups)
  let found = false;
  const userGroups = JSON.parse(localStorage.getItem('tokens')).groups;
  if (userGroups.constructor.name === "Array") {
    userGroups.forEach(group => {
      if(allowedGroups.find(elem => elem === group)) found = true;
    }
    );
  } else {
    if(allowedGroups.find(elem => elem === userGroups)) found = true;
  }
  if(!found) return false;
  return true;
}
