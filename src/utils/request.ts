import Taro from "@tarojs/taro";

// 根据环境判断url
const prefix =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://localhost:5000";

//网络请求拦截器
const interceptor: Taro.interceptor =  <T>(chain: Taro.Chain) => {
  const requestParams = chain.requestParams;
  requestParams.header = {
    ...requestParams.header,
  };
  return chain.proceed(requestParams).then(async (res: T) => {
    return res;
  });
};

Taro.addInterceptor(interceptor);

const request = async <T>(options: Taro.request.Option) => {
  const contentType =
    options.method === "GET"
      ? "application/x-www-form-urlencoded"
      : "application/json";

  const header = {
    "Content-Type": contentType,
    ...options.header,
  };

  return await Taro.request<T>({
    ...options,
    url: prefix + options.url,
    method: options.method || "GET",
    header,
  });
};

type Method = "GET" | "POST" | "PUT" | "DELETE";

const methods = ["GET", "POST", "PUT", "DELETE"] as Method[];

methods.forEach((method) => {
  request[method] = (
    url: string,
    data?: any,
    options?: Taro.request.Option
  ) => {
    return request({
      url,
      data,
      ...options,
      method,
    });
  };
});

export { request };
