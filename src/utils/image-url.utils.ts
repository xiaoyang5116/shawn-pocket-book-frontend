import { baseUrl } from "./axios.utils";

export const imageUrlTrans = (url: string) => {
  if (url && url.startsWith("http")) {
    return url;
  } else {
    url = `${baseUrl}${url}`;
    return url;
  }
};
