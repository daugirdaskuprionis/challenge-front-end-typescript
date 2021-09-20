import React from "react";
import { useState, useEffect } from "react";
import Post from './Post';
import CreatePost from "./CreatePost";
import Pagination from "./Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState('home');
  const [postId, setPostId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const loadPosts = await (await fetch(`https://jsonplaceholder.typicode.com/posts/`)).json();
      setPosts(loadPosts);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  
  const handlePage = (e, page) => {
    e.preventDefault();

    if (page === 'home') {
      setPage('home');
      setCurrentPage(1);
    }

    if (page === 'post') {
      setPostId(Number(e.target.id));
      setPage('post');
    }

    if (page === 'createpost') {
      setPage('createpost');
    }
  }

  return (
      <div className="container">
          <div className="nav">
            <a href="#" onClick={(e) => handlePage(e, 'home')}>Home</a>
            <a href="#" onClick={(e) => handlePage(e, 'createpost')}>Create Post</a>
          </div>
          
          <div className="infoMessage">
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
          </div>
      
          { page === 'home' ?
            <div>
              <h1>Posts</h1>
              <ul>
              { currentPosts.map(post => (
                <li className="post" key={post.id}>
                  <a className="titlePost" onClick={(e) => handlePage(e, 'post')} id={`${post.id}`} href={`${post.id}`}>{post.title}</a>
                  <p>{post.body}</p>
                </li>
                ))
              }
              </ul>
              <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
            </div> 
            : null
          }
  
          { page === 'post' ? <Post posts={posts} postId={postId} /> : null }
          { page === 'createpost' ? <CreatePost posts={posts} /> : null}
      </div>
  );
}

export default App;