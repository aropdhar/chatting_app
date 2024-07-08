import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Rootlayout from "./layout/Rootlayout";
import Home from "./pages/home/Home";
import Message from "./pages/message/Message";
import Setting from "./pages/settings/Setting";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Rootlayout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/message" element={<Message/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Route>
        <Route path="/" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Route>
    )
  );

  return (<RouterProvider router={router}/>)
}

export default App
