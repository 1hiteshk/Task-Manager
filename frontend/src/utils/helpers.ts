
import useCookie from "@/hooks/cookie/useCookie";

export const isUserLoggedIn = () => {
  const { getCookie } = useCookie();
  const token = getCookie('token') || (typeof window !== 'undefined' && localStorage.getItem('token'));

  if (!token) {
   // console.error('Token is not available');
    return false;
  }

  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    console.log(payload.user);
    return !payload.user?.userName;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
}

export function isEmpty(value: any) {
  if (value == null) {
    // Checks for null and undefined
    return true;
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    // Checks for empty string or array
    return value.length === 0;
  }

  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      // Checks for empty Map or Set
      return value.size === 0;
    }

    // Checks for empty object
    return Object.keys(value).length === 0;
  }

  if (typeof value === 'boolean') {
    // Booleans are never empty
    return false;
  }

  if (typeof value === 'number') {
    // Numbers are never empty (0 is not considered "empty")
    return false;
  }

  if (typeof value === 'function') {
    // Functions are never empty
    return false;
  }

  return false;
}