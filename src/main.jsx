import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initCsrf, setupCsrfInterceptor } from './utils/csrf'

// Register the axios interceptor before anything renders so every
// mutating request will have the X-CSRF-Token header attached.
setupCsrfInterceptor();

// Pre-fetch the CSRF token eagerly so it's ready before the user
// clicks anything. Runs in the background — does not block render.
initCsrf();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
