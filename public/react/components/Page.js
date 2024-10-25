import React, { useEffect, useState } from 'react';

export const Page = (props) => {
  const [author, setAuthor] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const authorResponse = await fetch(`http://localhost:3000/api/users/${props.page.authorId}`);
      const authorData = await authorResponse.json();
      setAuthor(authorData);

      if (props.page.tags) {
        const tagsPromises = props.page.tags.map(tag => 
          fetch(`http://localhost:3000/api/tags/${tag}`)
        );
        const tagsResponses = await Promise.all(tagsPromises);
        const tagsData = await Promise.all(tagsResponses.map(res => res.json()));
        setTags(tagsData);
      }
    };

    fetchDetails();
  }, [props.page]);

  const handleClick = () => {
    props.onPageClick(props.page.slug); // Use the slug to fetch details
  };

  return (
    <>
      <h3 onClick={handleClick} style={{ cursor: 'pointer', color: 'blue' }}>{props.page.title}</h3>
      {/* Only show author, content, tags, and createdAt if selectedPage is not null */}
    </>
  );
};
