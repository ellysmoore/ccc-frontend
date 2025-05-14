export const updateSearchParams = (type: string, value: string, options?: { 
  refreshPage?: boolean
  refreshSearch?: boolean 
}) => {
  const { refreshPage = false, refreshSearch = false } = options ?? {};
  const searchParams = new URLSearchParams(window.location.search);
  if (type) {
    searchParams.set(type, value);
  } 
  if (refreshPage) {
    searchParams.set('page', '1');
  }
  if (refreshSearch) {
    searchParams.set('q', '');
  }
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  // newSearchParams.delete(type.toLocaleLowerCase());
  newSearchParams.delete(type);
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};