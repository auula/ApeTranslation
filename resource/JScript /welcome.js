//引入一些必备的组件
const { BrowserWindow, app } = require('electron').remote
const path = require('path')
const http = require('http')
//使用vue数据绑定方便
var vue = new Vue({
    el: "#welcome",
    data: {
        content: 'Hello',
        icon: './ticon.png',
        mpegUrl: '',
        audio: new Audio(),
        btnShow: false
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getServerData();
        },
        Play() {
            this.audio.src = this.mpegUrl;
            this.audio.play()
        },
        Learning(event) {
            const modalPath = path.join('file://', __dirname, '/view/AppMain.html')
            let win = new BrowserWindow({
                width: 810, height: 560,
                frame: false,
                // resizable: false,
                center: true
            })
            win.webContents.openDevTools()
            win.on('close', () => { win = null })
            win.loadURL(modalPath)
            win.show()
            window.close()
        },
        ////获取服务器数据
        async getServerData() {
            http.get(ServerAPI.welcome_api, (res) => {
                if (res.statusCode == 200) {
                    this.btnShow = true;
                }
                res.setEncoding('utf-8')
                res.on('data', (result) => {
                    this.content = JSON.parse(result).content;
                    this.mpegUrl = JSON.parse(result).mpegUrl;
                })
            }).on('error', (e) => {
                this.content = "服务器可能睡着了~请你稍后重试!程序8秒后自动退出!";
                window.setTimeout(function () {
                    app.quit();
                }, 8000)
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
