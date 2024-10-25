import React, { useState } from "react"
import apiURL from "../api";

function Article({returnToHomePage}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newArticle = {
            title,
            content,
            name: authorName,
            email:authorEmail,
            tags: tags.split(" ").map(tag => tag.trim()),
        };

        try {
            const response = await fetch(`${apiURL}/wiki`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newArticle) // Send the article data here
            });
      
            if (response.ok) {
              const data = await response.json(); // Parse the JSON response
              console.log('Article created:', data); // Log the created article
              returnToHomePage(); // Go back to the home page after successful submission
            } else {
              console.error('Failed to create article');
            }
          } catch (err) {
            console.error('Error submitting article:', err);
          }

    }

    return(
    <>
    <h1>Create an Article</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required/>
        </div>
        <div>
            <label>Content:</label>
            <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required/>
        </div>
        <div>
            <label>Author Name:</label>
            <input
            type="text"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            required/>
        </div>
        <div>
            <label>Author Email:</label>
            <input
            type="email"
            value={authorEmail}
            onChange={(event) => setAuthorEmail(event.target.value)}
            required/>
        </div>
        <div>
            <label>Tags:</label>
            <input
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            />
        </div>
        <button type="submit" >Submit Article</button>
    </form>
    <button onClick={returnToHomePage}>Return to Home Page</button>
    
    </>)
}

export default Article;