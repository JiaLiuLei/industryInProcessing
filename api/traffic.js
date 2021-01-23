import request from "@/util/request";
import config from "./config/traffic";

// 交通安全信息列表
export const getTrafficList = options => request(config.list_traffic_info_security, {data: options});

// 交通安全信息添加
export const addTrafficInfo = options => request(config.traffic_info_security, {method: "post", header: {"content-type": "application/x-www-form-urlencoded"}, data: options});

// 交通安全信息详情
export const getTrafficInfo = options => request(config.get_traffic_info_security + options);

// 交通安全信息修改
export const updateTrafficInfo = options => request(config.update_traffic_info_security, {method: "post", header: {"content-type": "application/x-www-form-urlencoded"}, data: options});

// 交通安全信息删除
export const deleteTrafficInfo = options => request(config.delete_traffic_info_security + options);