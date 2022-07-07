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

// danh sách bài hát


// object cấu trúc

const app = {
    songs: [
        {
            name: 'ai',
            singer: 'Vicetone',
            path: './asset/music/Shay-Nanggg-AMEE-Obito.mp3',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zANPoWHH636U0D4a6WyH5IRjBGMUjwh9yA&usqp=CAU'
        },
        {
            name: 'vì anh vì ai',
            singer: 'Đông Nhi',
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
            <div class="song" data-url=${song.name}>
                <div class="thumb" style="background-image: url(${song.img})">
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
        var nameTitle = $('.name-title');
        var img = $('.cd-thumb');
        var audio =$('#audio');
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
        // play
        var btnPlay = $('.btn-toggle-play');
        var audio = $('#audio');
        btnPlay.onclick = function () {
            if(audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        // next
        // bắt sự kiện lên bài hát => lấy ra index
        // render nó vào thẻ audio
        // bắt sự kiện lên nút play để phát nhạc
        const song = $$('.song');
        for (i = 0; i < song.length; i++) {
            song[i].addEventListener('click', function () {
                console.log(this);

                console.log(this);
            });
        }
    },
    
    start: function() {
        this.render();
        this.loadingFirstSong();
        this.handleEvent();
        
    }
};
app.start()

// play music
        // 1/ lắng nghe sự kiện click lên btn-toggle-play
        // 2/ click vafo btnPlay thì phát nhạc

 



