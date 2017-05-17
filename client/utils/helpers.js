
export const summarize = (str, wordCount = 17) => str
    .trim()
    .replace(/\s+/, ' ')
    .split(' ')
    .splice(0, wordCount)
    .join(' ')
    .concat(' .....');


let cachedToken = null;

export const setToken = function (token, payload) {
  cachedToken = token;
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('payload', JSON.stringify(payload));
};

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
  if (isAuthenticated()) {
    return JSON.parse(localStorage.getItem('payload'));
  }
};
