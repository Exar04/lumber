import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import { NoPage } from './pages/noPage.tsx';
import { HomePage } from './pages/homePage.tsx';
import { MainLayout } from './layout/mainLayout.tsx';
import { TablePage } from './pages/tablePage.tsx';
import { GlobalProvider } from './context/globalContext.tsx';
import { QueryPage } from './pages/queryPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/table/:tableName", element: <TablePage /> },
      { path: "/query/:queryTitle", element: <QueryPage /> },
    ],
  },
  { path: '*', element: <NoPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
    {/* </AuthProvider> */}
  </StrictMode>,
)