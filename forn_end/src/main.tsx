import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureAxios } from './config.ts'
import { LoadingProvider } from './contexts/loading.tsx'
import { CartProvider } from './contexts/cart.tsx'
import { UserProvider } from './contexts/user.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
configureAxios()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </UserProvider>
        </ThemeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
  ,
)
