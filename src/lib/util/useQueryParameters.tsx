import React from 'react';
import { useLocation } from 'react-router-dom';

const useQueryParameters = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default useQueryParameters;
