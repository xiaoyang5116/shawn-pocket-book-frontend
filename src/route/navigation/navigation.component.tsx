import { Link, Outlet } from "react-router-dom";
import { Button, SafeArea } from "antd-mobile";
import Footer from "../../components/footer/footer.component";

const Navigation = () => {
  return (
    <div>
      <div style={{ background: "#1677ff" }}>
        <SafeArea position="top" />
      </div>
      <Link to={"/"}>
        <Button>首页</Button>
      </Link>
      <Link to={"/sign-in"}>
        <Button>登录</Button>
      </Link>
      <Outlet />
      <Footer />
      <div style={{ background: "#1677ff" }}>
        <SafeArea position="bottom" />
      </div>
    </div>
  );
};

export default Navigation;
