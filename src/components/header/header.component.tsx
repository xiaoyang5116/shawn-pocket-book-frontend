import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";

// import styles from "./header.styles.module.scss";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  return <NavBar onBack={() => navigate(-1)}>{title}</NavBar>;
};

export default Header;
