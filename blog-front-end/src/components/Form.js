import React, { useState, useEffect } from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import Login from '../components/Login';
import { useContext } from 'react';


function Form(props) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState(props.post.body)
    const [token] = useCookies(['mytoken'])
    const [author_context] = useCookies(['currusr'])
    const author = author_context.currusr


    useEffect(() => {
        setTitle(props.post.title)
        setBody(props.post.body)
    }, [props.post])

    const updatePost = () => {
        APIService.UpdatePost(props.post.id, { title, body }, token['mytoken']).then(resp => props.updatedInformation(resp))
    }


    const insertArticle = () => {
        APIService.InsertArticle({ author, title, body }, token['mytoken']).then(resp => props.insertedInformation(resp))
        console.log(author)
    }

    return (
        <div>
            {props.post ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control text-black" id="title"
                        placeholder="Please enter the title" value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="body" className="form-label">Body</label>
                    <textarea className="form-control" id="description" rows="5"
                        value={body} onChange={e => setBody(e.target.value)} >
                    </textarea>
                    <br />

                    {
                        props.post.id ? <button onClick={updatePost} className="btn btn-success">Update Post</button>
                            : <button onClick={insertArticle} className="btn btn-success">Insert Article</button>


                    }
                </div>

            ) : null}
        </div>
    )
}

export default Form
