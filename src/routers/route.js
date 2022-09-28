import About from "../pages/About"
import Posts from "../pages/Posts"
import PostIdPage from "../pages/PostIdPage"
import Login from "../pages/Login"

export const privateRoute = [
    {path: '/about', element: About, exact: true },
    {path: '/posts', element: Posts, exact: true },
    {path: '/posts/:id', element: PostIdPage, exact: true },
]

export const pablicRoute = [
    {path: '/login', element: Login, exact: true },
]
