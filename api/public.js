import request from "@/util/request";
import config from "./config/public";

// 获取首页数据
export const getHomeInfo = () => request(config.home);