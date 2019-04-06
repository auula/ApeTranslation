//服务器API请求类
const server_host = "http://http://159.65.139.41:9098/";
var ServerAPI = {
    welcome_api: server_host + "welcome/api",
    trans_api: server_host + "transapi/from",
    ocr_api: server_host + "ocr/api",
    update_api: server_host + "null",
    version_api: server_host + "checkUpdate",
}