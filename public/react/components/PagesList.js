import React from 'react';
import { Page } from './Page';

export const PagesList = ({ pages, onPageClick }) => {
  return (
    <>
      {pages.map((page, idx) => (
        <Page key={idx} page={page} onPageClick={onPageClick} />
      ))}
    </>
  );
};
