export const getWebStorage = (
  key: string,
  parse: boolean = false,
  type: 'local' | 'session' = 'local'
) => {
  if (typeof window !== 'undefined') {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      const storedData = storage.getItem(key);

      if (parse) {
        return storedData ? JSON.parse(storedData) : null;
      } else {
        return storedData || '';
      }
    } catch (error) {
      console.error(`Error retrieving data from ${type}Storage:`, error);
      return parse ? null : '';
    }
  } else {
    return parse ? null : '';
  }
};

// eslint-disable-next-line
export const setWebStorage = (key: string, value: any, type: 'local' | 'session' = 'local') => {
  if (typeof window !== 'undefined') {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${type}Storage:`, error);
    }
  } else {
    return;
  }
};

export const removeWebStorage = (key: string, type: 'local' | 'session' = 'local') => {
  if (typeof window !== 'undefined') {
    try {
      const storage = type === 'session' ? sessionStorage : localStorage;
      storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from ${type}Storage:`, error);
    }
  } else {
    return;
  }
};
