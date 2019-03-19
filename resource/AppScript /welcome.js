//welcome对象
let welcome = {
    content: "Welclome this App.",
    icon: "./ticon.png",
    mpegUrl: "http://news.iciba.com/admin/tts/2019-03-19-day.mp3",
    //获取最新版本
    new_version: function (event) {

    },
    //检查更新
    update: function (params) {

    },
    //获取服务器数据
    getServerData: function (event) {

    }
};
var vue = new Vue({
    el: "#welcome",
    data: {
        content: "Welclome this App.",
        icon: "./ticon.png",
        mpegUrl: "http://news.iciba.com/admin/tts/2019-03-19-day.mp3",
    }
});
//创建新窗口函数
const { BrowserWindow } = require('electron').remote
const path = require('path')
const newWindowBtn = document.getElementById('Play')
newWindowBtn.addEventListener('click', (event) => {
    //创建audio对象为下面播放🎵音乐作准备
    let audio = new Audio()
    audio.src = "http://news.iciba.com/admin/tts/2019-03-19-day.mp3"
    audio.play();
    const modalPath = path.join('file://', __dirname, '/view/main.html')
    let win = new BrowserWindow({ width: 860, height: 620 })
    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
    this.close();
})