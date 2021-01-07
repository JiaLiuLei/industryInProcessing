import request from "@/util/request";
import config from "./config/task";

// 获取警情任务列表
export const getTask = options => request(config.list, {data: options});

// 获取警情详情
export const getTaskDetail = options => request(config.detail, { data: options });