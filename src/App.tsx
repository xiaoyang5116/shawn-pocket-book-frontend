import { Route, Routes } from "react-router-dom";
import { SafeArea } from "antd-mobile";
import SignIn from "./route/sign-in/sign-in.component";
import Navigation from "./route/navigation/navigation.component";
import Login from "./route/login/login.component";

function App() {
  return (
    <>
      <div className="safeArea-container">
        <SafeArea position="top" />
      </div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<div>账单</div>} />
          <Route path="statistics" element={<div>统计</div>} />
          <Route path="user" element={<div>我的</div>} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="safeArea-container">
        <SafeArea position="bottom" />
      </div>
    </>
  );
}

export default App;
