import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SafeArea } from "antd-mobile";
import { useToken } from "./stores/token.store";
import SkeletonPage from "./components/skeleton-page/skeleton-page.component";

const Navigation = lazy(
  () => import("./route/navigation/navigation.component")
);
const NoMatch = lazy(() => import("./route/no-match/no-match.component"));
const Authentication = lazy(
  () => import("./route/authentication/authentication.component")
);
const Bill = lazy(() => import("./route/bill/bill.component"));
const BillDetail = lazy(
  () => import("./route/bill-detail/bill-detail.component")
);
const Statistics = lazy(
  () => import("./route/statistics/statistics.component")
);
const User = lazy(() => import("./route/user/user.component"));
const UserInfo = lazy(() => import("./route/user-info/user-info.component"));
const Account = lazy(() => import("./route/account/account.components"));
const About = lazy(() => import("./route/about/about.component"));

function App() {
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [token, navigate]);

  return (
    <Suspense fallback={<SkeletonPage />}>
      <div className="safeArea-container">
        <SafeArea position="top" />
      </div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Bill />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path="/detail/:id" element={<BillDetail />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <div className="safeArea-container">
        <SafeArea position="bottom" />
      </div>
    </Suspense>
  );
}

export default App;
