import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'ragistration',
        element: <Registration/>
      }
    ]
  }
]) 

function App(){
  return  <RouterProvider router={router}/>
}
export default App