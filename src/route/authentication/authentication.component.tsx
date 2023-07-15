import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../../components/login/login.component";
import { useToken } from "../../stores/token.store";
import Register from "../../components/register/register.component";
import { useNavigate } from "react-router-dom";

import styles from "./authentication.styles.module.scss";

const tabs = [
  { path: "login", title: "登录" },
  { path: "register", title: "注册" },
];

const Authentication = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.head}></div>
      <nav>
        <ul>
          {tabs.map((item) => (
            <li
              key={item.path}
              className={item === selectedTab ? styles.selected : ""}
              onClick={() => setSelectedTab(item)}
            >
              {item.title}
              {item === selectedTab ? (
                <motion.div className={styles.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.main}>
        <AnimatePresence>
          <motion.div
            key={selectedTab ? selectedTab.path : "empty"}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.path === "login" ? (
              <Login />
            ) : (
              <Register selectedLoginTab={() => setSelectedTab(tabs[0])} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Authentication;
