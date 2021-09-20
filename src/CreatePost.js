import { useState } from 'react';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: null,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

    return (
        <div className="createPost">
            <h1>Add new Post</h1>
            <form className="createForm" onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <label>Body:</label>
                <input
                    value={body}
                    type="text" 
                    required
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
} 

export default CreatePost;