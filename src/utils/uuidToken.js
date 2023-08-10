import { v1 as uuid } from 'uuid';

export const getUuidToken = () => {
  let uuidToken = localStorage.getItem('uuid');
  if (!uuidToken) {
    uuidToken = uuid();
    localStorage.setItem('uuid', uuidToken);
  }
  return uuidToken;
};
