import request from "@/util/request";
import config from "./config/task";

// 获取警情任务列表
export const getTask = options => request(config.list, {data: options});

// 获取警情详情
export const getTaskDetail = options => request(config.detail, { data: options });

// 立即处理当前警情
export const dealWithTask = options => request(config.dispose, { method: "post", data: options });

// 修改警情状态
export const updateTaskStatus = options => request(config.updateStatus, { method: "post", data: options });

// 上传回执信息
export const uploadReceipt = options => request(config.receipt, { method: "post", data: options });

// 上传警情
export const uploadTask = options => request(config.uploadTask, { method: "post", data: options });