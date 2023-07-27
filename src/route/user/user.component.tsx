import { useEffect } from "react";
import { useGetUserInfo, useUser } from "../../stores/user.store";
import { Avatar, List, Button } from "antd-mobile";
import { UserSetOutline, LockOutline, TeamOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { imageUrlTrans } from "../../utils/image-url.utils";
import { DEFAULT_USER_NAME } from "../../constant/user";

import styles from "./user.styles.module.scss";

const User = () => {
  const user = useUser();
  const getUserInfo = useGetUserInfo();
  const navigate = useNavigate();

  const signOutHandler = () => {
    localStorage.clear();
    location.href = "/auth";
  };

  useEffect(() => {
    if (!user) {
      getUserInfo();
    }
  }, [user, getUserInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <div className={styles.headLeft}>
          <div>昵称：{user?.username === DEFAULT_USER_NAME ? "游客" : user?.username}</div>
          <div>个性签名：{user?.signature || "暂无个签"}</div>
        </div>
        <Avatar
          src={`${imageUrlTrans(user?.avatar as string)}`}
          className={styles.avatar}
        />
      </div>

      <div className={styles.settingContainer}>
        <List className={styles.list}>
          <List.Item
            className={styles.listItem}
            prefix={<UserSetOutline />}
            onClick={() => navigate("/userInfo")}
          >
            修改用户信息
          </List.Item>
          <List.Item
            className={styles.listItem}
            prefix={<LockOutline />}
            onClick={() => navigate("/account")}
          >
            重制密码
          </List.Item>
          <List.Item
            className={styles.listItem}
            prefix={<TeamOutline />}
            onClick={() => navigate("/about")}
          >
            关于
          </List.Item>
        </List>
      </div>

      <div className={styles.signOut}>
        <Button color="danger" size="large" block onClick={signOutHandler}>
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default User;
