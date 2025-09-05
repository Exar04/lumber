import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/authContext.js';

import './index.css'
import { NoPage } from './pages/noPage.tsx';
import { HomePage } from './pages/homePage.tsx';
import { MainLayout } from './layout/mainLayout.tsx';
import { TablePage } from './pages/tablePage.tsx';
import { GlobalProvider } from './context/globalContext.tsx';

// function PrivateRoute() {
//   const { token } = useAuth();
//   console.log('PrivateRoute token:', token);
//   return token ? <MainLayout /> : <Navigate to="/login" replace />;
// }

const router = createBrowserRouter([
  // { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/table/:tableName", element: <TablePage /> },
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