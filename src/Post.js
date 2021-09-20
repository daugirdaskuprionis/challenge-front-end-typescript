import { useEffect, useState } from "react";

function Post({ posts, postId }) {
    const [post, setPost] = useState({ id: null, title: '', body: ''});
    const [editPostId, setEditId] = useState(null);
    const [editFormData, setEditFormData] =  useState({ title: '', body: '' });

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        posts.map((post) => {
            if (post.id === postId) {
                setPost(post);
            }
        })
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditId(post.id);

        const formValues = {
            id: post.id,
            title: post.title,
            body: post.body
        }
        setEditFormData(formValues);
    }

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const editedPost = {
            id: editFormData.id,
            title: editFormData.title,
            body: editFormData.body
        }

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                editedPost
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            }).then((response) => response.json())
                .then(() => {
                    setPost(editedPost);
                    console.log(editedPost);
                });
        
        setPost(editedPost);
        setEditId(null);
    }
    
    return (
        <div className="singlePost">
            { editPostId !== postId ?
            <div>
                <button onClick={(e) => handleEditClick(e)}>Edit</button>
                <p className="titlePost">{post.title}</p>
                <p>{post.body}</p>
            </div>
                : 
            <form onSubmit={handleEditFormSubmit}>
                <label>Title:</label>
                <input name="title" type="text" required value={editFormData.title} onChange={handleEditFormChange} />
                <label>Body:</label>
                <input name="body" type="text" required value={editFormData.body} onChange={handleEditFormChange} />
                <button type="submit">Save</button>
            </form>
            }
        </div>
    );
}

export default Post;
  