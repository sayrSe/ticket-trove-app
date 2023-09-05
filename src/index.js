import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Home from './components/Home';
import ViewLocations from './components/ViewLocations';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import Showtimes from './components/Showtimes';
import MovieDetails from './components/MovieDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: '/cinemas/:id',
      element: <ViewLocations />,
    },
    {
      path: "/cinemas/:id/showtimes",
      element: <Showtimes/>
    },
    {
      path: "/movies/:id",
      element: <MovieDetails/>
    }
  ]
}])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
