import jwtDecode from 'jwt-decode';

let cachedToken = null;

/**
   * Gets a users token
   *
   * @param {void} null
   * @return {string} cachedToken
   */
export const getToken = () => {
  if (!cachedToken) {
    if (typeof window !== 'undefined') {
      cachedToken = window.localStorage.getItem('jwtToken');
    }
  }
  return cachedToken;
};

/**
   * Checks whether a user is authenticated or not
   * @param {void} null
   * @return {void} null
   */
export const isAuthenticated = () => !!getToken();

/**
   * Removes a users token
   *
   * @param {void} null
   * @return {void} null
   */
export const removeToken = () => {
  cachedToken = null;
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('payload');
};

/**
   * Sets a current user
   *
   * @param {void} null
   * @return {string} decode token
   */
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

/**
   * Checks whether a user has admin access
   *
   * @param {void} null
   * @return {void} null
   */
export const hasAdmin = () =>
  getCurrentUser().roleId === 1;

/**
   * Checks whether a user is not an admin
   *
   * @param {void} null
   * @return {string} null
   */
export const notAdmin = () =>
  getCurrentUser().roleId !== 1;

/**
   * Checks whether a user has document permission
   *
   * @param {number} ownerId
   * @return {void} null
   */
export const hasDocumentPermission
= ownerId => hasAdmin() ? true : getCurrentUser().userId === ownerId;

if (typeof window !== 'undefined') {
  window.getCurrentUser = getCurrentUser;
}
