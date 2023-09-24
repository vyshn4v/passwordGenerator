import './App.scss'
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import User from './routes/User';
import { AxiosInterceptorsSetup } from './config/axios';
import { useEffect } from 'react';
function App() {
  return (
    <>
      <BrowserRouter>
        <AxiosInterPrectorNavigate />
        <Routes>
          <Route path='/*' element={
            <User />
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}


const AxiosInterPrectorNavigate = () => {
  const navigate = useNavigate()
  useEffect(() => {
    AxiosInterceptorsSetup(navigate);
  }, [navigate])
  return <></>
}
export default App
