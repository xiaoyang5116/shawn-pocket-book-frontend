import { Link, Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

const Navigation = () => {
  return (
    <div>
      <Link to={"/"}>
        <Button>首页</Button>
      </Link>
      <Link to={"/sign-in"}>
        <Button>登录</Button>
      </Link>
      <Outlet />
    </div>
  );
};

export default Navigation;
