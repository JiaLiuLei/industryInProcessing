import request from "@/util/request";
import config from "./config/user";

// 登录
export const login = options => request(config.login,{method: "post", header: {"content-type": "application/x-www-form-urlencoded"}, data: options});

// 获取验证码
export const getCode = options => request(config.code, {method: "post", header: {"content-type": "application/x-www-form-urlencoded"}, data: options});

// 绑定警车
export const bindPolice = options => request(config.bind, {method: "post", data: options});

