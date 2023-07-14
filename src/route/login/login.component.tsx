import { useState } from "react";
import { LockOutline, UserOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { request } from "../../utils/axios.utils";

import styles from "./login.styles.module.scss";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const [tab, setTab] = useState("login");

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
    request.post("/user/login", data);
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
          // loading
          // loadingText="正在加载"
        >
          登录
        </Button>
      </form>

      {/* <Form layout="horizontal" className={styles.form}>
        <Form.Item label="账号" name="username">
          <Input placeholder="请输入内容" clearable className={styles.input} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          extra={
            <div className={styles.eye}>
              {!visible ? (
                <EyeInvisibleOutline
                  onClick={() => setVisible(true)}
                  className={styles.icon}
                />
              ) : (
                <EyeOutline
                  onClick={() => setVisible(false)}
                  className={styles.icon}
                />
              )}
            </div>
          }
        >
          <Input
            placeholder="请输入密码"
            clearable
            type={visible ? "text" : "password"}
            className={styles.input}
          />
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default Login;
