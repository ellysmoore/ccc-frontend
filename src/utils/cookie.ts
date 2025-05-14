import Cookies from 'js-cookie';

export const getCookie = (
  key: string, 
  parse: boolean = false
) => {
  const storedData = Cookies.get(key);
  if (parse) {
    return storedData ? JSON.parse(storedData) : null;
  } else {
    return storedData || '';
  } 
};

// eslint-disable-next-line
export const setCookie = (key: string, value: any) => {
  Cookies.set(key, JSON.stringify(value));
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
