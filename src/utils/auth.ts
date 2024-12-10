const setAuthToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
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
  removeAuthToken,
  setRole,
  getRole,
  removeRole,
};
