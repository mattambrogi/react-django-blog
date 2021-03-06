import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie';
import Post from './components/Post';




function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/posts' element={<App />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:author_name" element={<App />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router />


  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
