import { useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SafeArea, Result } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import { useSetToken, useToken } from "./stores/token.store";
import SkeletonPage from "./components/skeleton-page/skeleton-page.component";
import { isMobile } from "react-device-detect";
import { useLogin } from "./stores/user.store";
import { DEFAULT_PASSWORD, DEFAULT_USER_NAME } from "./constant/user";

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
  const login = useLogin()
  const token = useToken();
  const setToken = useSetToken();

  useEffect(() => {
    if (!token && location.pathname !== "/auth" && isMobile) {
      login({
        username: DEFAULT_USER_NAME,
        password: DEFAULT_PASSWORD
      }).then(result => setToken(result.token))
    }
  }, [token, login, setToken]);

  if (!isMobile) {
    return (
      <div>
        <Result
          icon={<SmileOutline />}
          status="success"
          title="欢迎来到 shawn 记账本"
          description="请使用手机浏览器访问"
        />
      </div>
    );
  }

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
