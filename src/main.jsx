import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./redux/store.js"
import { ApiDataProvider }from '../src/src/Components/Context/schoolData.jsx';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
      <App />
  </Provider>
  ,
)
