//import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link
} from "react-router-dom";
import './App.sass'
import Icon from "./assets/icons/icon.svg?react";
import Root from "./routes/Root";
import File from "./routes/file/File";
import Landing from "./routes/landing/Landing";
import Login from "./routes/login/login";
import Signup from "./routes/register/register";
import ProtectedRoute from "./components/util/protectedRoute";
import Home from "./routes/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Home />
          }
        ]
      },
      {
        path: "/landing",
        element: <Landing />
      },
      {
        path: "file/:fileName",
        element: <File />
      }
    ]
  },
  {
    path: "/",
    element: (
      <>
        <header id="site-header">
        <Link to="landing">
          <div className="logo">
            <span className="svg-wrapper">
              <Icon />
            </span>
            <span>HelpMeOut</span>
          </div>
        </Link>
        </header>
        <Outlet />
      </>
    ),
    children: [
    {
      path:"login",
      element: <Login />
    },
    {
      path: "sign-up",
      element: <Signup />
    },]
  }
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

export default App
