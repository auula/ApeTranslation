//引入一些必备的组件
const { BrowserWindow, app } = require('electron').remote
const path = require('path')
const http = require('http')
var vue = new Vue({
    el: "#content-main",
    data: {
        trans: false,
        about: false,
        server_list: true,
    }
});

function Exit() {
    mdui.dialog({
        title: '⚠️系统提示:',
        content: '你是想退出软件吗？如果想点击“退出”或者“取消”',
        buttons: [
            {
                text: '取消'
            },
            {
                text: '退出',
                onClick: function (inst) {
                    //console.log("infoLog:", "销毁App进程", new Date())
                    Quit();
                }
            }
        ]
    });
}
//销毁App进程
function Quit() {
    const { app } = require('electron').remote
    app.quit();
}