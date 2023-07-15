import { LockOutline, UserOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { request } from "../../utils/axios.utils";
import { useSetToken } from "../../stores/token.store";
import { useNavigate } from "react-router-dom";

import styles from "./login.styles.module.scss";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const setToken = useSetToken();
  const navigate = useNavigate();

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
        <input type="password" {...register("password", { required: true })} />
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>

      <Button
        className={styles.button}
        type={"submit"}
        block
        color="primary"
        size="large"
      >
        登录
      </Button>
    </form>
  );
};

export default Login;
