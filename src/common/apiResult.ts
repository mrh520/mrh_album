/** 
 * api返回结果
*/
export class ApiResult {
    code: number;
    data?: any;
    message: string;
}
/**
 * 返回状态码
 */
export const enum StatusCode {
    failed = 0,
    success = 1,
}
/**
 * 返回提示信息
 */
export const enum Message {
    success = "success",
    failed = "failed",
}