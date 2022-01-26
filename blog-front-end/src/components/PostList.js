import React from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";



function PostList(props) {

    const [token] = useCookies(['mytoken'])
    const [user] = useCookies(['currusr'])
    const profile = props.profile
    const location = useLocation().pathname



    const editBtn = (post) => {
        props.editBtn(post) //notifys parent of click
    }

    const deletePost = (post) => {
        APIService.DeletePost(post.id, token['mytoken']).then(() => props.deletePost(post)).catch(error => console.log(error))
    }

    function checkAuthor(post) {
        if (profile) {
            return post.author_name === profile
        }
        else {
            return true
        }
    }




    return (
        <div className="w-50">
            {
                props.posts && props.posts.filter(checkAuthor).map(post => {
                    return (
                        <div key={post.id}>
                            <Link
                                to={`/post/${post.id}`}
                                state={{ prevLocation: location }}>
                                <h2>{post.title}</h2>
                            </Link>
                            <Link to={`/user/${post.author_name}`}>
                                <p className="text-muted">{post.author_name}</p>
                            </Link>
                            <p>{post.body}</p>
                            {user['currusr'] == post.author ?
                                <div className="row">
                                    <div className="col-md-2">
                                        <button className="btn btn-primary" onClick={() => editBtn(post)}>Update</button>
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={() => deletePost(post)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                                : null
                            }
                            <hr />
                        </div>
                    )
                })
            }
        </div >
    )
}

export default PostList
