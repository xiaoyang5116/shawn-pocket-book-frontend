import Header from "../../components/header/header.component";
import { Divider } from "antd-mobile";

import styles from "./about.styles.module.scss";

const About = () => {
  return (
    <div>
      <Header title="关于" />
      <Divider />
      <div className={styles.container}>
        <h1>作者</h1>
        <p>微信号： yxdsg1443584075</p>
        <p>QQ邮箱: 1443584075@qq.com</p>
        <p>
          <a href="https://github.com/xiaoyang5116/shawn-pocket-book-frontend">
            前端地址
          </a>
        </p>
        <p>
          <a href="https://github.com/xiaoyang5116/shawn-pocket-book-backend">
            后端地址
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
