import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../pages/Main.tsx';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store.ts';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from '../pages/Main.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './config/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((page, index) => {
              return (
                <Route
                  path={page.path}
                  element={<page.element />}
                  key={`${page.path}_${index}`}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
