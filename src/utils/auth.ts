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

export { setAuthToken, getAuthToken, removeAuthToken };
