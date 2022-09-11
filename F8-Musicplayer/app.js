'use strict'
/** các bước xây dựng JS
 * 1. render song
 * 2. Scroll top
 * 3. play, pause, seek
 * CD rotate
 * Random
 * next/ repeat when end
 * scroll active song into view
 * play song when click
 */

//  chuẩn bị biến để rút gọn cú pháp khi get element
// bind() dùng để liên kết $('.class') = document.quẻyselecttor(".class")
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var nameTitle = $('.name-title');
var audio =$('#audio');
var btnPlay = $('.btn-toggle-play');
var btnPlayer = $('.player');
var cdThumb = $('.cd-thumb');
var initSong = true;
// danh sách bài hát


// object cấu trúc

const app = {
    songs: [
        {
            name: 'shay nang',
            singer: 'Vicetone',
            path: './asset/music/Shay-Nanggg-AMEE-Obito.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'

        },
        {
            name: 'xin mua roi',
            singer: 'Trung Quan',
            path: './asset/music/Xin-Mua-Roi-Nhanh-Trung-Quan-Idol-Hoang-Rob.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'

        },
        {
            name: 'Dot Chay',
            singer: 'Binz',
            path: './asset/music/Dot-Chay-Linh-Cao.mp3',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zANPoWHH636U0D4a6WyH5IRjBGMUjwh9yA&usqp=CAU'
        },
        {
            name: 'Bất ngờ',
            singer: 'Vicetone',
            path: './asset/music/Con-Gi-Giua-Chung-Ta-Miu-Le.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/Tu-Ngay-Mai-Em-Se-Khac-Huong-Giang.mp3',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zANPoWHH636U0D4a6WyH5IRjBGMUjwh9yA&usqp=CAU'

        }
    ], 
    curentSong : 0,
    getCurentSong: function() {
        return this.curentSong
    },
    setCurentSong: function(value) {
        var songsLenght = this.songs.length
        if(value >= songsLenght | value < 0) {
            value = 0
        }
        return this.curentSong = value
    },
    render: function() {
        let songBlock = $('.playlist')
        let html = this.songs.map(function (song ,index) {
            return `
            <div class="song" data-url=${song.path}>
                <div class="thumb" data-index=${index}  data-img=${song.img} style="background-image: url(${song.img})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        return songBlock.innerHTML = html.join('')
    },

    // loadding songs
    // 1 thay đổi tên và ảnh
    // 2 load bài hát đầu tiên truyền link vào tag src
    // click vào nút play thì phát nhạc
    
    loadingSong: function() {
        let curentSong = this.getCurentSong()
        nameTitle.innerText = this.songs[curentSong].name
        cdThumb.style.backgroundImage = 'url' + '(' + `${this.songs[curentSong].img}` + ')'
         audio.innerHTML = `<source src=${this.songs[curentSong].path} type="audio/mpeg">`
        // audio.src = this.songs[curentSong].path;
        if (initSong !== true) {
            audio.load()
            // var duration = audio.duration
            // console.log(duration);
            audio.addEventListener('loadedmetadata', function(e) {
                // console.log(e);
            });
            this.musicPlay(audio)
        }
    },

//  hàm xử lý sự kiện 
    handleEvent: function() {
        // lắng nghe sự kiện trên cả trang
        // bắt sự kiện scroll
        // bắt sự kiện crollUp crollDown
        // thay đổi width và padding-top
        // scrolldown tăng width và padding-top 0 - 100% 
        // scrollup giảm từ 100% - 0

        var cd = $('.cd');
        var cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth + "px"
        }

        // next
        // bắt sự kiện lên bài hát => lấy ra index
        // render nó vào thẻ audio
        // bắt sự kiện lên nút play để phát nhạc
        const song = $$('.song');
        for (let i = 0; i < song.length; i++) {
            var that = this;
            song[i].addEventListener('click', function () {
                song.forEach(itemSong => {
                    itemSong.removeAttribute('data-active')
                });
                var name = this.querySelector('.title').innerText;
                var path = this.dataset.url;
                var imgurl = this.querySelector('.thumb').dataset.img;
                var nameTitle = $('.name-title');
                var audio =$('#audio');
                nameTitle.innerText = name;
                cdThumb.style.backgroundImage = 'url' + '(' + `${imgurl}` + ')';
                audio.innerHTML = `<source src=${path} type="audio/mpeg">`;
                var duration = audio.duration;
                this.setAttribute('data-active','true')
                audio.load();
                that.musicPlay(audio, duration);
            });
        }
        // btn next
        var btnNext = $('.btn-next');
        btnNext.onclick = () => {
            var curentSong = this.getCurentSong();
            var index = curentSong + 1
            this.setCurentSong(index)
            var newSong = this.setCurentSong(index)
            this.loadingSong(newSong)
        }

        // btn return
        var btnPrev = $('.btn-prev')
        btnPrev.onclick = () => {
            var curentSong = this.getCurentSong();
            var index = curentSong - 1
            this.setCurentSong(index)
            this.loadingSong()
        }

        // btnrandom
        // khi nut seek đậm là đang chế độ random click vào sẽ đổi bài ngẫu nhiên
        // khi seek tắt chế độ bth
        let btnRamdon = $('.btn-random');
        
        btnRamdon.onclick = () => {
            let that = this;
            let acctiveRandom = btnRamdon.classList.contains('btn-random--acctive')
            if(!acctiveRandom) {
                btnRamdon.classList.add('btn-random--acctive');
                var songsLenght = this.songs.length
                btnNext.onclick = () => {
                    var ramdonmSong = Math.floor(Math.random () *songsLenght )
                    that.curentSong = ramdonmSong
                    that.loadingSong()
                }
                btnPrev.onclick = () => {
                    var ramdonmSong = Math.floor(Math.random () *songsLenght )
                    that.curentSong = ramdonmSong
                    that.loadingSong()
                }
            }else {
                console.log('test')
                btnRamdon.classList.remove('btn-random--acctive')
               
            }
        }
        // btn preload
        let btnRepest = $('.btn-repeat')
        btnRepest.onclick = () => {
            audio.curentTime = 0;
            audio.load()
            audio.play()
        }
        
    },
    // them key cho bai hat dau tien
    // kiem tra the chua data neu laf true thi lay ra bai hat 
    // gan co xac bai hat hien tai
    // event click next 
    // loop .song de xac dinh bai hat hien tai đang hat
    // lay bai hat tiep theo

    musicPlay: function(audio, duration) {
        audio.play();
        var fullTime = audio.duration ? audio.duration : duration;
        var round = (fullTime * 360) / 5;
        cdThumb.classList.remove('stop-animation');
        cdThumb.style.animationDuration = fullTime + "s";
        cdThumb.style.setProperty('--change',  round + "deg");

        if (!btnPlayer.classList.contains('playing')) {
            btnPlayer.classList.add('playing');
        }
    },

    musicPause: function() {
        audio.pause();
        cdThumb.classList.add('stop-animation')
        btnPlayer.classList.remove('playing');
    },

    clickBtnPlay: function() {
        btnPlay.addEventListener('click', () => {
            initSong = false;
            if(audio.paused) {
                this.musicPlay(audio);
            } else {
                this.musicPause(audio);
            }   
        });
    },
    progress: function() {

        audio.ontimeupdate = function() {
            let duration = audio.duration
            let curentTime = audio.currentTime
            $('.progress').setAttribute('max', duration )
            $('.progress').setAttribute('value', curentTime )
        };
        $('.progress').onchange = function(e) {
            console.log(audio.currentTime = this.value);
        };
    },
    
    start: function() {
        this.render();
        this.loadingSong();
        this.handleEvent();
        this.clickBtnPlay();
        this.progress();
    }
};
app.start()




