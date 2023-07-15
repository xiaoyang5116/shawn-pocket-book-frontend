import { useCallback, useState, useRef } from "react";
import { LockOutline, UserOutline } from "antd-mobile-icons";
import { Button } from "antd-mobile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { request } from "../../utils/axios.utils";
import Captcha from "react-captcha-code";

import styles from "../login/login.styles.module.scss";

type FormData = {
  username: string;
  password: string;
  captcha: string;
};

type RegisterProp = {
  selectedLoginTab: () => void;
};

const Register = ({ selectedLoginTab }: RegisterProp) => {
  const captchaRef = useRef<any>();
  const [captcha, setCaptcha] = useState("");

  const handleChange = useCallback((code: string) => {
    setCaptcha(code);
  }, []);

  const validationSchema: ZodType<FormData> = z
    .object({
      username: z.string().min(1, "*请输入账号"),
      password: z.string().nonempty("*请输入密码").min(6, "*密码至少有6位"),
      captcha: z.string().nonempty("请输入验证码"),
    })
    .refine((value) => value.captcha === captcha, {
      message: "验证码错误",
      path: ["captcha"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    await request.post("/user/register", {
      username: data.username,
      password: data.password,
    });
    selectedLoginTab();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formItem}>
        <UserOutline className={styles.icon} />
        <input type="text" {...register("username", { required: true })} />
        {errors.username && (
          <p className={styles.error}>{errors.username?.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <LockOutline className={styles.icon} />
        <input type="password" {...register("password", { required: true })} />
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>
      <div className={styles.formItem}>
        <LockOutline className={styles.icon} />
        <input
          type="text"
          {...register("captcha", { required: true })}
          className={styles.captchaInput}
        />
        <Captcha
          onChange={handleChange}
          ref={captchaRef}
          className={styles.captcha}
        />
        {errors.captcha && (
          <p className={styles.error}>{errors.captcha?.message}</p>
        )}
      </div>

      <Button
        className={styles.button}
        type={"submit"}
        block
        color="primary"
        size="large"
      >
        注册
      </Button>
    </form>
  );
};

export default Register;
