const setAuthToken = (accessToken: string) => {
  const expiration = new Date().getTime() + 5 * 60 * 1000; // 만료시간 5분
  localStorage.setItem(
    'accessToken',
    JSON.stringify({ accessToken, expiration }),
  );
};

const getAuthToken = () => {
  const tokenData = localStorage.getItem('accessToken');
  const accessToken = tokenData ? JSON.parse(tokenData).accessToken : '';
  return accessToken;
};

const getTokenExpiration = () => {
  const tokenData = localStorage.getItem('accessToken');
  const expiration = tokenData ? JSON.parse(tokenData).expiration : '';
  return expiration;
};

const removeAuthToken = () => {
  localStorage.removeItem('accessToken');
};

// role 저장

const setRole = (role: string) => {
  localStorage.setItem('role', role);
};

const getRole = () => {
  const role = localStorage.getItem('role');
  return role;
};

const removeRole = () => {
  localStorage.removeItem('role');
};

export {
  setAuthToken,
  getAuthToken,
  getTokenExpiration,
  removeAuthToken,
  setRole,
  getRole,
  removeRole,
};
