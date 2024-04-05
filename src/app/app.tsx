import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './config/router.tsx';
import { SocketProvider } from './socket/socket-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
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
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
