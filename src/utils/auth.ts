const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export { getAuthToken, removeAuthToken };
