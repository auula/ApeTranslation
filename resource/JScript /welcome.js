//引入一些必备的组件
const { BrowserWindow } = require('electron').remote
const path = require('path')
const http = require('http')
//welcome对象
let welcome = {
    content: "",
    icon: "./ticon.png",
    mpegUrl: "",
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
        content: 'Hello',
        icon: './ticon.png',
        mpegUrl: '',
        audio: new Audio(),
    },
    mounted() {
        this.init();
        this.getServerData();
    },
    methods: {
        init() {
            var package = require("./package.json");
            console.log(package);
            alert(package.version)
        },
        Play() {
            this.audio.src = this.mpegUrl;
            this.audio.play()
        },
        Learning(event) {
            const modalPath = path.join('file://', __dirname, '/view/main.html')
            let win = new BrowserWindow({ width: 860, height: 620 })
            win.on('close', () => { win = null })
            win.loadURL(modalPath)
            win.show()
            window.close()
        },
        ////获取服务器数据
        async getServerData() {
            http.get(ServerAPI.welcome_api, (res) => {
                console.log(`Got response: ${res.statusCode}`);
                res.setEncoding('utf-8')
                res.on('data', (result) => {
                    this.content = JSON.parse(result).content;
                    this.mpegUrl = JSON.parse(result).mpegUrl;
                })
            }).on('error', (e) => {
                console.log(`Got error: ${e.message}`);
            });
        },

    },
});


// const PlayBtn = document.getElementById('Play')
// //创建audio对象为下面播放🎵音乐作准备,移动到外面防止重复点击
// const audio = new Audio();
// PlayBtn.addEventListener('click', (event) => {
//     audio.src = welcome.mpegUrl;

// });
//创建新窗口函数
// const LearningBtn = document.getElementById("Learning")
// LearningBtn.addEventListener('click', (event) => {
//     const modalPath = path.join('file://', __dirname, '/view/main.html')
//     let win = new BrowserWindow({ width: 860, height: 620 })
//     win.on('close', () => { win = null })
//     win.loadURL(modalPath)
//     win.show()
//     this.close()
// });
