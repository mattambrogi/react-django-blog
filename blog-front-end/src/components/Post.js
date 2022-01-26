import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import APIService from '../APIService';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';



function Post() {
    const [post, setPost] = useState({});
    const { id } = useParams();
    let navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/${id}/`);
                setPost(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <div className="App">
            <Header />
            <h2>{post.title}</h2>
            <p className="text-muted">{post.author_name}</p>
            <p>{post.body}</p>
            <button onClick={() => navigate(location.state.prevLocation)}>Go back</button>
        </div>
    )
}

export default Post
