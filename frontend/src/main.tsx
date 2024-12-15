import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from './pages/booklist/BookList.tsx'
import BookDetail from './pages/bookdetail/BookDetail.tsx';
import CreateBook from './pages/createbook/CreateBook.tsx';
import UpdateBook from './pages/updatebook/Update.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BookList />,
      },
      {
        path: "books",
        children: [
          {
            index: true,
            element: <BookList />,
          },
          {
            path: ":id",
            element: <BookDetail />
          },
          {
            path: "create",
            element: <CreateBook />
          },
          {
            path: ":id/update",
            element: <UpdateBook />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
