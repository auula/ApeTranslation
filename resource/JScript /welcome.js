
//welcome对象
let welcome = {
    content: "The foundation of knowledge must be laid by reading.",
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
//使用vue数据绑定方便
var vue = new Vue({
    el: "#welcome",
    data: {
        content: welcome.content,
        icon: welcome.icon,
        mpegUrl: welcome.mpegUrl,
    }
});
window.onload = function () {
    alert(ServerAPI.welcome_api)
}
const { BrowserWindow } = require('electron').remote
const path = require('path')
const PlayBtn = document.getElementById('Play')
//创建audio对象为下面播放🎵音乐作准备,移动到外面防止重复点击
const audio = new Audio();
PlayBtn.addEventListener('click', (event) => {
    audio.src = welcome.mpegUrl;
    audio.play()
});
//创建新窗口函数
const LearningBtn = document.getElementById("Learning")
LearningBtn.addEventListener('click', (event) => {
    const modalPath = path.join('file://', __dirname, '/view/main.html')
    let win = new BrowserWindow({ width: 860, height: 620 })
    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
    this.close()
});
