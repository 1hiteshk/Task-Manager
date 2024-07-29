import useCookie from './cookie/useCookie';

const userProfile = async () => {
  const { getCookie } = useCookie();
  const token = getCookie('token');

  if (!token) {
    console.error('Token is not available');
    return null;
  }

  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  console.log(payload.user)

  return payload.user;
};

export default userProfile;
