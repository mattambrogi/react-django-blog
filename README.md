# React Django Blog
A blogging platform built with a React frontend and Django Rest Framework backend. I used this project as a deep dive into React and building applications with API based backends.

## What it is
This is a simple feed based blogging platform. Users can create an account and write blog posts which will then be shown on the main feed. Users have profile pages where their posts are displayed and can be managed if they are logged in.

## Why I built it
I had built a number of monolithic Django apps and a few very simple apps with React / DRF. I wanted to build something slightly more complex that would teach me about token based authentication and managing state and permissions in React. 

## Features
Users can
- Create an account
- View a feed of blog posts from all users
- Add, edit, and delete posts from the feed for which they are the author
- Navigate to profiles for each user
  - Edit and delete posts directly from their own profile
- Navigate to invidiual pages for each post
  - Edit and delete posts from detail page if they are the author


## Technologies
- Django Rest Framework
  - dj-rest-auth
- React
 - Hooks
 - Router
 - Context


## Learnings and reflections

This project allowed me to gets hands on experience with many core parts of React. I now feel comfortable diving into React code. Building this exposed me to:
* Passing props between components
* Managing state
* Using hooks: useEffect, useState
* Context API
* Using Cookies for state information
* React Router
* Using data from a REST API
* Token based authentication
* Conditional views and permissions (i.e. only see edit button if author)
* Conditionally routing depending on previous page (i.e. back button takes user feed or profile depending on they accessed blog post)

