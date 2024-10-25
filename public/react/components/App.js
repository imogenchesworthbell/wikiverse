import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import apiURL from '../api';
import Article from "./Article";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  const showAddingArticle = () => setIsAddingArticle(true);
  const returnToHomePage = () => {
    setIsAddingArticle(false);
    setSelectedPage(null);
    fetchPages() 
  };

  
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log('Oh no an error! ', err);
      }
    }
    
  useEffect(() => {
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

      {isAddingArticle ? (
        <Article returnToHomePage={returnToHomePage} />
      ) : selectedPage ? (
        <>
          <h3>{selectedPage.title}</h3>
          <h4>Author: {selectedPage.author.name}</h4>
          <h4>{selectedPage.content}</h4>
          <h4>Tags: {selectedPage.tags.map(tag => tag.name).join(', ')}</h4>
          <h4>Created At: {new Date(selectedPage.createdAt).toLocaleDateString('en-GB')}</h4>
          <button onClick={handleBackToList} style={{backgroundColor:'lightblue'}}>Back to Wiki List</button>
        </>
      ) : (
        <>
          
          <PagesList pages={pages} onPageClick={handlePageClick} />
          
          <button onClick={showAddingArticle}>Add Article</button>
        </>
      )}
    </main>
  );
};

