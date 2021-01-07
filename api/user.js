import request from "@/util/request";
import config from "./config/user";

// 登录
export const login = options => request(config.login, options);

// 获取验证码
export const getCode = options => request(config.code, {method: "post", data: options});

