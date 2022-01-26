import './App.css';
import { useState, useEffect } from 'react'
import PostList from './components/PostList';
import APIService from './APIService';
import Form from './components/Form';
import Header from './components/Header';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import { Collapse } from 'bootstrap';



function App() {

  const [posts, setPosts] = useState([])
  const [editPost, setEditPost] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  const [usr, setUsr] = useCookies(['currusr'])
  const [usrName, setUsrName] = useCookies(['currUserName'])
  const [pr, setPR] = useState(null)
  const params = useParams()
  let navigate = useNavigate()
  var [toggle, setToggle] = useState(false);


  //Get posts on load
  useEffect(() => {
    APIService.GetPosts(token)
      .then(resp => resp.json())
      .then(resp => setPosts(resp))
      .catch(error => console.log(error))
  }, [])

  //if no token is present, go to login page
  useEffect(() => {
    if (!token['mytoken']) {
      navigate('/')
    }
  }, [token])

  const editBtn = (post) => {
    setEditPost(post)
    setToggle(toggle => !toggle)
  }

  //update post list after data changes
  const updatedInformation = (post) => {
    const new_post = posts.map(mypost => {
      if (mypost.id === post.id) {
        return post;
      }
      else {
        return mypost;
      }
    })
    setPosts(new_post)
  }

  const insertedInformation = (post) => {
    const new_posts = [...posts, post]
    setPosts(new_posts)
  }

  //creates article edit and insert form
  const articleForm = () => {
    setEditPost({ title: '', body: '' })
    setToggle(toggle => !toggle)

  }


  const deletePost = (post) => {
    const new_posts = posts.filter(mypost => {
      if (mypost.id === post.id) {
        return false;
      }
      return true;
    })
    setPosts(new_posts)
  }

  const logoutUser = () => {
    removeToken(['mytoken'])
  }

  //helper function which determines if current user can post on the page they are on
  //false if on someone else's profile
  function canPost() {
    if (params.author_name && params.author_name != usrName['currUserName']) {
      return false
    }
    else {
      return true
    }
  }

  //toggles display of form
  useEffect(() => {
    var myCollapse = document.getElementById('collapseTarget')
    var bsCollapse = new Collapse(myCollapse, { toggle: false })
    toggle ? bsCollapse.show() : bsCollapse.hide()
  })


  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <Header />
          <br />
          {canPost() ? <button onClick={articleForm} className="btn btn-primary">Insert Article</button>
            : null}
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col">
          <div className="collapse" id="collapseTarget">
            {editPost && canPost() ? <Form post={editPost} updatedInformation={updatedInformation}
              insertedInformation={insertedInformation} /> : null}
          </div>
          <PostList posts={posts} editBtn={editBtn} deletePost={deletePost} profile={params.author_name} />
        </div>
      </div>
    </div>
  );
}



export default App;
