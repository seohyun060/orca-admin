import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  children: JSX.Element;
  title: string;
};

const HelmetHoc = ({ children, title }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default HelmetHoc;
