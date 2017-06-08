import jwtDecode from 'jwt-decode';

let cachedToken = null;

export const getToken = () => {
  if (!cachedToken) {
    if (typeof window !== 'undefined') {
      cachedToken = window.localStorage.getItem('jwtToken');
    }
  }
  return cachedToken;
};

export const isAuthenticated = () => !!getToken();

export const removeToken = () => {
  cachedToken = null;
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('payload');
};

export const getCurrentUser = () => {
  const authStatus = isAuthenticated();
  if (authStatus) {
    return jwtDecode(localStorage.getItem('jwtToken'));
  }
  return {
    roleId: 0,
    userId: 0,
  };
};
export const hasAdmin = () =>
  getCurrentUser().roleId === 1;

export const hasDocumentPermission
= ownerId => hasAdmin() ? true : getCurrentUser().userId === ownerId;

if (typeof window !== 'undefined') {
  window.getCurrentUser = getCurrentUser;
}
