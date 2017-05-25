import jwtDecode from 'jwt-decode';

let cachedToken = null;

// const setToken = function (token, payload) {
//   cachedToken = token;
//   localStorage.setItem('jwtToken', token);
//   localStorage.setItem('payload', JSON.stringify(payload));
// };

export const getToken = () => {
  if (!cachedToken) {
    cachedToken = localStorage.getItem('jwtToken');
  }
  return cachedToken;
};

export const isAuthenticated = () => !!getToken();

export const removeToken = () => {
  cachedToken = null;
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('payload');
};

export const getPayload = () => {
  const authStatus = isAuthenticated();
  if (authStatus) {
    return jwtDecode(localStorage.getItem('jwtToken'));
  } else {
    return {
      roleId: 0,
      userId: 0,
    };
  }
};
export const hasAdmin = () =>
  getPayload().roleId === 1;

export const hasDocumentPermission = (ownerId) => {
  return hasAdmin() ? true : getPayload().userId === ownerId;
};


window.getPayload = getPayload;
