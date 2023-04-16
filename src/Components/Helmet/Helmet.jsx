
import React, { useEffect } from 'react';

const Helmet = ({title, children}) => {
  useEffect(() => {
    document.title = "Maltimart - " + title ;
  }, [title]);

  return (
    <div className='w-100'>{children}</div>
  );
};

export default Helmet;