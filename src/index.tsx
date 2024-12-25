import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/font.scss'
import 'antd/dist/antd.min.css'
import './styles/index.scss'
import './styles/app.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from 'page/500_Page'
import 'moment/locale/vi'
import { store } from 'store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
       <Router>
            <App />
        </Router>
    </Provider>
)
