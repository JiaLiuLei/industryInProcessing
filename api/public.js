import request from "@/util/request";
import config from "./config/public";

// 获取首页数据
export const getHomeInfo = () => request(config.home);

// 上传文件
export const uploadImage = options => request(config.upload, { method:"post", data: options });

// 上传定位
export const uploadLocation = options => request(config.upload, { method:"post", data: options });