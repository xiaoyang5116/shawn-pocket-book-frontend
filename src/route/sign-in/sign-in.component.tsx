// import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "antd-mobile";
import FormInput from "../../components/form-input/form-input.component";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import styles from "./sign-in.styles.module.scss";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const validationSchema: ZodType<FormData> = z.object({
    email: z.string().email("不合法邮箱"),
    password: z.string().min(6, "密码最少6位"),
    // confirmPassword: z.string().min(6, "密码最少6位"),
  });
  // .refine((value) => value.password === value.confirmPassword, {
  //   message: "两次密码不一致",
  //   path: ["confirmPassword"],
  // });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (values: FormData) => {
    console.log("values", values);

    try {
      // const data = await fetch("http://localhost:3000/user");
      const data = await fetch("/api/user");
      console.log(data);
      
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.signIn}`}>
        <h1 className={styles.logo}>SIGN IN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="邮箱"
                type="email"
                value={value}
                onChange={onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="密码"
                type="password"
                onChange={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <Button block color="primary" size="large" type="submit">
            登录
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
