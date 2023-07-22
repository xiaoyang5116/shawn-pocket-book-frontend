import { useEffect, useState } from "react";
import Header from "../../components/header/header.component";
import {
  Divider,
  Image,
  ImageViewer,
  ImageUploader,
  Toast,
  Button,
  TextArea,
} from "antd-mobile";
import {
  useGetUserInfo,
  useUpdateUserInfo,
  useUploadImage,
  useUser,
} from "../../stores/user.store";
import { imageUrlTrans } from "../../utils/image-url.utils";

import styles from "./user-info.styles.module.scss";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const userInfo = useUser();
  const getUserInfo = useGetUserInfo();
  const uploadImage = useUploadImage();
  const updateUserInfo = useUpdateUserInfo();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState(userInfo?.avatar as string);
  const [signature, setSignature] = useState<string | undefined>(
    userInfo?.signature
  );
  const [imgVisible, setImgVisible] = useState(false);

  const mockUpload = async (file: File) => {
    const formData = new FormData();
    // 生成 form-data 数据类型
    formData.append("avatar", file);
    uploadImage(formData).then((result) => setAvatarUrl(result));
    return {
      url: URL.createObjectURL(file),
    };
  };

  const beforeUpload = (file: File) => {
    if (file.size > 1024 * 1024) {
      Toast.show("请选择小于 1M 的图片");
      return null;
    }
    return file;
  };

  const saveHandler = () => {
    if (!signature) {
      return Toast.show("个性签名不能为空");
    }
    if (!avatarUrl) {
      return Toast.show("头像不能为空");
    }
    updateUserInfo({ avatar: avatarUrl, signature: signature as string }).then(
      () => {
        navigate(-1);
      }
    );
  };

  useEffect(() => {
    if (!userInfo) {
      getUserInfo().then((result) => {
        setAvatarUrl(result.avatar);
        setSignature(result.signature);
      });
    }
  }, [userInfo, getUserInfo]);

  return (
    <div className={styles.container}>
      <Header title="用户信息" />
      <div className={styles.mainContainer}>
        <h1>个人资料</h1>
        <Divider />
        <div className={styles.imgContainer}>
          <Image
            src={imageUrlTrans(avatarUrl)}
            className={styles.img}
            fit="cover"
            onClick={() => setImgVisible(true)}
          />
          <div className={styles.text}>
            <div>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</div>
            <ImageUploader
              preview={false}
              showFailed={false}
              className={styles.imgUpload}
              upload={mockUpload}
              beforeUpload={beforeUpload}
            >
              <Button block color="primary" size="small">
                点击上传
              </Button>
            </ImageUploader>
          </div>
        </div>
        <Divider />
        <div className={styles.signatureContainer}>
          <div className={styles.title}>个性签名</div>
          <div className={styles.signature}>
            <TextArea
              placeholder={"请输入个性签名"}
              value={signature}
              onChange={(value) => setSignature(value)}
              showCount
              maxLength={20}
            />
          </div>
        </div>
        <Button
          block
          color="primary"
          size="large"
          className={styles.button}
          onClick={saveHandler}
        >
          保存
        </Button>
      </div>
      <ImageViewer
        image={imageUrlTrans(avatarUrl)}
        visible={imgVisible}
        onClose={() => {
          setImgVisible(false);
        }}
      />
    </div>
  );
};

export default UserInfo;
