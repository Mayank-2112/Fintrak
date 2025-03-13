import SignIn from "./sign-in/SignIn"
import SignUp from "./sign-up/SignUp"
import Dashboard from "./dashboard/Dashboard"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
function App() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <SignIn />} />

        <Route path="/sign-up" element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
