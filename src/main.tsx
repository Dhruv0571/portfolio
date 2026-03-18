import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App'

// Easter egg
console.log("👋 Hey there, fellow developer! Thanks for peeking under the hood. Built with React + GSAP + Three.js. — Dhruv");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
