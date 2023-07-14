import { useEffect, useState } from "react";
import { LockOutline, UserOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { request } from "../../utils/axios.utils";

import styles from "./login.styles.module.scss";
import { useSetToken, useToken } from "../../stores/token.store";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const setToken = useSetToken();
  const token = useToken();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const validationSchema: ZodType<FormData> = z.object({
    username: z.string().min(1, "*请输入账号"),
    password: z.string().min(1, "*请输入密码"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result: { token: string } = await request.post("/user/login", data);
    setToken(result.token);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}></div>
      <div className={styles.title}>
        <span
          className={tab === "login" ? styles.tab : ""}
          onClick={() => setTab("login")}
        >
          登录
        </span>
        <span
          className={tab === "register" ? styles.tab : ""}
          onClick={() => setTab("register")}
        >
          注册
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formItem}>
          <UserOutline className={styles.icon} />
          <input type="text" {...register("username", { required: true })} />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <LockOutline className={styles.icon} />
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.username?.message}</p>
          )}
        </div>

        <Button
          className={styles.button}
          type={"submit"}
          block
          color="primary"
          size="large"
        >
          {tab === "login" ? "登录" : "注册"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
