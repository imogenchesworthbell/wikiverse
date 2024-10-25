import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log('Oh no an error! ', err);
      }
    }

    fetchPages();
  }, []);

  const handlePageClick = async (slug) => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const pageData = await response.json();
      setSelectedPage(pageData);
    } catch (err) {
      console.log('Error fetching page details:', err);
    }
  };

  const handleBackToList = () => {
    setSelectedPage(null);
  };

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {selectedPage ? (
        <>
          <h3>{selectedPage.title}</h3>
          <h4>Author: {selectedPage.author.name}</h4>
          <p>{selectedPage.content}</p>
          <h4>Tags: {selectedPage.tags.map(function (tag) { return tag.name; }).join(', ')}</h4>
          <h4>Created At: {new Date(selectedPage.createdAt).toLocaleDateString('en-GB')}</h4>
          <button onClick={handleBackToList}>Back to Wiki List</button>
        </>
      ) : (
        <PagesList pages={pages} onPageClick={handlePageClick} />
      )}
    </main>
  );
};
