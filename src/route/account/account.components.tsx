import { useState } from "react";
import Header from "../../components/header/header.component";
import { Divider, Form, Input, Button, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { ResetPasswordType, useResetPassword, useUser } from '../../stores/user.store';

import styles from "./account.styles.module.scss";
import { useNavigate } from "react-router-dom";
import { DEFAULT_USER_NAME } from "../../constant/user";

const Account = () => {
  const userInfo = useUser()
  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validationSchema: ZodType<ResetPasswordType> = z
    .object({
      oldPassword: z.string().nonempty("*请输入密码"),
      newPassword: z
        .string()
        .nonempty("*请输入新密码")
        .min(6, "*密码至少有6位"),
      confirmPassword: z
        .string()
        .nonempty("*请再次输入新密码确认")
        .min(6, "*密码至少有6位"),
    })
    .refine((value) => value.newPassword === value.confirmPassword, {
      message: "两次密码不一致",
      path: ["confirmPassword"],
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    if (userInfo?.username === DEFAULT_USER_NAME) return Toast.show("游客密码不能修改");

    resetPassword(data).then(() => {
      Toast.show("修改成功");
      navigate(-1);
    });
  }

  return (
    <div className={styles.container}>
      <Header title="重置密码" />
      <Divider />
      <div>
        <Form
          layout="horizontal"
          footer={
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
            >
              提交
            </Button>
          }
        >
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item
                label="原密码"
                name="oldPassword"
                extra={
                  <div className={styles.eye}>
                    {!oldPasswordVisible ? (
                      <EyeInvisibleOutline
                        onClick={() => setOldPasswordVisible(true)}
                      />
                    ) : (
                      <EyeOutline
                        onClick={() => setOldPasswordVisible(false)}
                      />
                    )}
                  </div>
                }
              >
                <Input
                  placeholder="请输入原密码"
                  type={oldPasswordVisible ? "text" : "password"}
                  clearable
                  {...field}
                />
              </Form.Item>
            )}
          />
          {errors.oldPassword && (
            <p className={styles.error}>{errors.oldPassword?.message}</p>
          )}

          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item
                label="新密码"
                name="newPassword"
                extra={
                  <div className={styles.eye}>
                    {!newPasswordVisible ? (
                      <EyeInvisibleOutline
                        onClick={() => setNewPasswordVisible(true)}
                      />
                    ) : (
                      <EyeOutline
                        onClick={() => setNewPasswordVisible(false)}
                      />
                    )}
                  </div>
                }
              >
                <Input
                  placeholder="请输入新密码"
                  type={newPasswordVisible ? "text" : "password"}
                  clearable
                  {...field}
                />
              </Form.Item>
            )}
          />
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword?.message}</p>
          )}

          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Item
                label="确认密码"
                name="confirmPassword"
                extra={
                  <div className={styles.eye}>
                    {!confirmPasswordVisible ? (
                      <EyeInvisibleOutline
                        onClick={() => setConfirmPasswordVisible(true)}
                      />
                    ) : (
                      <EyeOutline
                        onClick={() => setConfirmPasswordVisible(false)}
                      />
                    )}
                  </div>
                }
              >
                <Input
                  placeholder="请输入密码"
                  clearable
                  type={confirmPasswordVisible ? "text" : "password"}
                  {...field}
                />
              </Form.Item>
            )}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword?.message}</p>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Account;
