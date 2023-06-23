import { Route, Routes } from "react-router-dom";
import Navigation from "./route/navigation/navigation.component";
import SignIn from "./route/sign-in/sign-in.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<div>home</div>} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
