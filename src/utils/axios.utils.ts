import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Toast } from "antd-mobile";
import type { ToastHandler } from "antd-mobile/es/components/toast";
import { useTokenStore } from "../stores/token.store";

const MODE = import.meta.env.MODE; // 环境变量

let loadingInstance: ToastHandler | null = null;
let requestNum = 0;

const jumpLogin = () => {
  useTokenStore.getState().clearToken();
};

// loading...
const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++;
  if (requestNum == 1) {
    loadingInstance = Toast.show({
      icon: "loading",
      content: "正在努力加载中....",
      maskClickable: false, //阻止背景点击
      duration: 0, // 不会自动消失
    });
  }
};

// 取消loading
const cancelLoading = () => {
  // 如果pending请求数量等于0，关闭loading
  requestNum--;
  if (requestNum === 0) loadingInstance?.close();
};

const createAxiosByInterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  // 创建一个 axios 实例
  const instance = axios.create({
    // 所有的请求地址前缀部分
    baseURL:
      MODE == "development"
        ? "http://127.0.0.1:5173/api"
        : "https://nest-test-60543-10-1305656531.sh.run.tcloudbase.com",
    timeout: 60000, // 请求超时时间毫秒
    headers: {
      // 设置后端需要的传参类型
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      // token: "your token",
    },
    ...config, // 自定义配置覆盖基本配置
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      const { loading = true } = config;
      console.log("config:", config);

      config.headers.Authorization = useTokenStore.getState().accessToken || "";

      if (loading) addLoading();
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response: any) {
      // 对响应数据做点什么
      console.log("response:", response);

      const { loading = true } = response.config;
      if (loading) cancelLoading();

      const { code, data, message } = response.data;
      console.log("sss");

      if (code === 200) return data;
      else if (code === 401) {
        jumpLogin();
      } else {
        Toast.show({
          content: message,
          position: "center",
        });
        return Promise.reject(response.data);
      }
    },

    function (error) {
      // 对响应错误做点什么
      console.log("error-response:", error.response);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);

      const { loading = true } = error.config;
      if (loading) cancelLoading();

      if (error.response) {
        if (error.response.status === 401) {
          jumpLogin();
        }
      }

      Toast.show({
        content: error?.response?.data?.message || "服务端异常",
        position: "center",
      });

      return Promise.reject(error);
    }
  );

  return instance;
};

export const request = createAxiosByInterceptors({});
