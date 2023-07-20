import { Route, Routes, useNavigate } from "react-router-dom";
import { SafeArea } from "antd-mobile";
import Navigation from "./route/navigation/navigation.component";
import NoMatch from "./route/no-match/no-match.component";
import Authentication from "./route/authentication/authentication.component";
import { useToken } from "./stores/token.store";
import { useEffect } from "react";
import Bill from "./route/bill/bill.component";
import BillDetail from "./route/bill-detail/bill-detail.component";
import Statistics from "./route/statistics/statistics.component";

function App() {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="safeArea-container">
        <SafeArea position="top" />
      </div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Bill />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="user" element={<div>我的</div>} />
        </Route>
        <Route path="/detail/:id" element={<BillDetail />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <div className="safeArea-container">
        <SafeArea position="bottom" />
      </div>
    </>
  );
}

export default App;
