//引入一些必备的组件
const { BrowserWindow, app, shell } = require('electron').remote
var $ = require('jQuery');


var Country;
var toCountry;
var vue = new Vue({
    el: "#content-main",
    data: {
        trans: true,
        about: false,
        server_list: false,
        OCR: false,
        t_result: "",
        audio: new Audio(),
    }
});

function tview() {
    vue.server_list = false;
    vue.about = false;
    vue.trans = true;
    vue.OCR = false;
}
function sview() {
    vue.OCR = false;
    vue.about = false;
    vue.trans = false;
    vue.server_list = true;
}
function aview() {
    vue.OCR = false;
    vue.trans = false;
    vue.server_list = false;
    vue.about = true;
}
function uview() {
    vue.trans = false;
    vue.server_list = false;
    vue.about = false;
    vue.OCR = true;
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

$(function () {
    // var Country = 
    // var toCountry = $('#toCountry option:selected').val();
    // alert(Country + ":" + toCountry)
});

function toGitHub() {
    shell.openExternal('https://github.com/JDode/ApeTranslation')
}
function toCopy() {
    var result = document.getElementById("t_result");
    result.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    mdui.snackbar({
        message: result.innerText + " 👌已经复制到剪切板！",
        position: 'right-bottom'
    });
    //alert("已复制好，可贴粘。");
}
function tran() {
    switch ($('#Country option:selected').val()) {
        case "1":
            Country = "zh";
            break;
        case "2":
            Country = "kor";
            break;
        case "3":
            Country = "jp";
            break;
        case "4":
            Country = "vie";
            break;
        case "5":
            Country = "ru";
            break;
        case "6":
            Country = "en";
            break;
    }
    switch ($('#toCountry option:selected').val()) {
        case "1":
            toCountry = "zh";
            break;
        case "2":
            toCountry = "kor";
            break;
        case "3":
            toCountry = "jp";
            break;
        case "4":
            toCountry = "vie";
            break;
        case "5":
            toCountry = "ru";
            break;
        case "6":
            toCountry = "en";
            break;
    }
    //alert(Country + ":" + toCountry)
    toTranslation(Country, toCountry);
}


function payload() {
    vue.audio.src = "http://localhost:9098/mp3/audio?languageCode=" + toCountry + "&text=" + vue.t_result;
    vue.audio.play()
}

function toTranslation(Country, toCountry) {

    if (Country == toCountry) {
        mdui.snackbar({
            message: '2个国家代码一样!😁请注意切换国家代码~',
            position: 'right-bottom'
        });
    }

    if (Country == "") {
        mdui.snackbar({
            message: '翻译内容为空😁!',
            position: 'right-bottom'
        });
    }
    if ($("#t_text").val() == "") {
        mdui.snackbar({
            message: '翻译内容为空😁!',
            position: 'right-bottom'
        });
    }
    //翻译内容
    $.get(ServerAPI.trans_api, { Country: Country, toCountry: toCountry, Query: $("#t_text").val() }, function (result) {
        console.log(result.data.t.data[0].dst)
        vue.t_result = result.data.t.data[0].dst;
    })
}




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