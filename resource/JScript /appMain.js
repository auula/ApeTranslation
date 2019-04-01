//引入一些必备的组件
const { BrowserWindow, app } = require('electron').remote
const path = require('path')
const http = require('http')

var vue = new Vue({
    el: "#content-main",
    data: {
        trans: true,
        about: false,
        server_list: false,
    }
});

function tview() {
    vue.server_list = false;
    vue.about = false;
    vue.trans = true;
}
function sview() {
    vue.about = false;
    vue.trans = false;
    vue.server_list = true;
}
function aview() {
    vue.trans = false;
    vue.server_list = false;
    vue.about = true;
}
//https://juejin.im/post/5c89d779518825126b3c9863
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
};
//销毁App进程
function Quit() {
    const { app } = require('electron').remote
    app.quit();
};

var t = {}, autourl = new Array(), autoname = [];
autourl[1] = "http://www.baidu.com/"; //这个是电信服务器站点
autourl[2] = "https://www.baidu.com/"; //这个是联通服务器站点
autoname[1] = "电信网路";
autoname[2] = "联通网路";
(function () {
    for (var i = 1; i < autourl.length; i++) {
        var img = new Image;
        //img.onerror= auto(autourl[i]);
        img.onerror = (function (j) {
            return function () {
                t[autourl[j]] = (new Date()) - t[autourl[j]];  //记入时间差
                // document.getElementById("t").innerHTML = t[autourl[1]] + ' ms';
                // console.log(autourl[j] + "    ：" + t[autourl[j]] + "ms"); //console.log(t[url] + "ms");
                document.getElementById("OCR").innerHTML = t[autourl[2]] + ' ms';
            }
        })(i);
        //闭包传值
        img.src = autourl[i] + Math.random();
        t[autourl[i]] = (+new Date());//记录开始载入时间
    }
})();