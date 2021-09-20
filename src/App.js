import React from "react";
import { useState, useEffect } from "react";
import Post from './Post';
import CreatePost from "./CreatePost";
import Pagination from "./Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState('home');
  const [postId, setPostId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // switching pages
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/`)
      .then(response => {
        return response.json();
      })
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
     })
  }

  const handleState = (e, state) => {
    e.preventDefault();

    if (state == 'home') {
      setState('home');
    }

    if (state == 'post') {
      setPostId(Number(e.target.id));
      setState('post');
    }

    if (state == 'createpost') {
      setState('createpost');
    }
  }

  return (
      <div className="container">
          <div className="nav">
            <a href="#" onClick={(e) => handleState(e, 'home')}>Home</a>
            <a href="#" onClick={(e) => handleState(e, 'createpost')}>Create Post</a>
          </div>
          
          { isLoading && <div>Loading...</div> }
          { error && <div>{ error }</div> }

          { state === 'home' ?
          <div>
            <ul>
            { currentPosts.map(post => (
              <li className="post" key={post.id}>
                <a onClick={(e) => handleState(e, 'post')} id={`${post.id}`} href={`${post.id}`}>{post.title}</a>
              </li>
              ))
            }
            </ul>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
          </div> 
          : null
          }

          { state === 'post' ? <Post posts={posts} postId={postId} /> : null }
          { state === 'createpost' ? <CreatePost posts={posts} /> : null}
      </div>
  );
}

export default App;