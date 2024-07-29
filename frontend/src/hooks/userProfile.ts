import useCookie from './cookie/useCookie';

const userProfile = async () => {
  const { getCookie } = useCookie();
  const token = getCookie('token') || localStorage.getItem('token');

  if (!token) {
    console.error('Token is not available');
    return null;
  }

  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    console.log(payload.user);
    return payload.user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default userProfile;
