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
var img = $('.cd-thumb');
var audio =$('#audio');
var btnPlay = $('.btn-toggle-play');
var btnPlayer = $('.player')
// danh sách bài hát


// object cấu trúc

const app = {
    songs: [
        {
            name: 'shay nang',
            singer: 'Vicetone',
            path: './asset/music/Shay-Nanggg-AMEE-Obito.mp3',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zANPoWHH636U0D4a6WyH5IRjBGMUjwh9yA&usqp=CAU'
        },
        {
            name: 'xin mua roi',
            singer: 'Đông Nhi',
            path: './asset/music/Xin-Mua-Roi-Nhanh-Trung-Quan-Idol-Hoang-Rob.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'Bất ngờ',
            singer: 'Vicetone',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './asset/music/song.mp3',
            img: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg'
        }
    ],
    render: function() {
        let songBlock = $('.playlist')
        let html = this.songs.map(function (song) {
            return `
            <div class="song" data-url=${song.path}>
                <div class="thumb" data-img=${song.img} style="background-image: url(${song.img})">
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
    loadingFirstSong: function() {
        nameTitle.innerText = this.songs[0].name
        img.style.backgroundImage = 'url' + '(' + `${this.songs[0].img}` + ')'
        audio.innerHTML = `<source src=${this.songs[0].path} type="audio/mpeg">`
    },

//  hàm xử lý sự kiện 
    handleEvent: function() {
        // lắng nghe sự kiện trên cả trang
        // bắt sự kiện scroll
        // bắt sự kiện crollUp crollDown
        // thay đổi width và padding-top
        // scrolldown tăng width và padding-top 0 - 100% 
        // scrollup giảm từ 100% - 0
        // var lastScrollTop = 0;
        // var w = 100;
        // console.log(cdWidth)
        // document.onscroll = function() {
        //     var st = window.pageYOffset || document.documentElement.scrollTop;
           
        //     if (st > lastScrollTop) {
        //         // downscroll code
        //         w = w * 2
        //         console.log('downscroll', w);

        //         w = w >= 100 ? 100 : w;
        //         w = w;
        //         // console.log('downscroll', w);
        //         cd.style.width = w + "%";
        //         cd.style.paddingTop = w + "%";
        //      } else {
        //         // upscroll code
        //         w = w / 2
        //         w = w <= 0 ? 0 : w;
        //         w = w;
        //         console.log('upscroll', w);
        //         cd.style.width = w + "%";
        //         cd.style.paddingTop = w + "%";
        //      };
        //      lastScrollTop = st <= 0 ? 0 : st; 
        // }

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
        for (i = 0; i < song.length; i++) {
            var that = this;
            song[i].addEventListener('click', function () {
                var name = this.querySelector('.title').innerText;
                var path = this.dataset.url;
                var imgurl = this.querySelector('.thumb').dataset.img;
                var nameTitle = $('.name-title');
                var img = $('.cd-thumb');
                var audio =$('#audio');
                nameTitle.innerText = name;
                img.style.backgroundImage = 'url' + '(' + `${imgurl}` + ')';
                audio.innerHTML = `<source src=${path} type="audio/mpeg">`;
                var duration = audio.duration;
                audio.load();
                that.musicPlay(audio, duration);
            });
        }
        
    },

    musicPlay: function(audio, duration) {
        audio.play();
        console.log(audio.duration);
        var fullTime = audio.duration ? audio.duration : duration;
        var rotate = $('.cd-thumb');
        var round = (fullTime * 360) / 5;
        rotate.classList.remove('stop-animation');
        rotate.style.animationDuration = fullTime + "s";
        rotate.style.setProperty('--change',  round + "deg");
        btnPlayer.classList.add('playing');
    },
    musicPause: function() {
        audio.pause();
        var rotate = $('.cd-thumb');
        rotate.classList.add('stop-animation')
        btnPlayer.classList.remove('playing');
    },
    clickBtnPlay: function() {
        var that = this;
        btnPlay.addEventListener('click', function() {
            if(audio.paused) {
                console.log(audio.duration);
                that.musicPlay(audio);
            } else {
                that.musicPause(audio);
            }   
        });
    },
    rotate : function() {
        btnPlay.onclick = function () {
            btnPlayer.classList.toggle('playing')
            var audio = $('#audio');
            if(audio.paused) {
                // rotate
                audio.play();
                var fullTime = audio.duration;
                var rotate = $('.cd-thumb')
                var round = (fullTime * 360) / 5
                rotate.classList.remove('stop-animation')
                rotate.style.animationDuration = fullTime + "s"
                rotate.style.setProperty('--change',  round + "deg");
            } else {
                audio.pause();
                var rotate = $('.cd-thumb');
                rotate.classList.add('stop-animation')
            }
        }
    },
    
    start: function() {
        this.render();
        this.loadingFirstSong();
        this.handleEvent();
        this.clickBtnPlay();
    }
};
app.start()

// play music
        // 1/ lắng nghe sự kiện click lên btn-toggle-play
        // 2/ click vafo btnPlay thì phát nhạc

 



