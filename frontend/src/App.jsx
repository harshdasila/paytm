import Dashboard from "./components/Dashboard";
import Index from "./components/Index";
import { SendMoney } from "./components/SendMoney";
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/send" element={<SendMoney />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
