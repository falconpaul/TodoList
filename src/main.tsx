import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
