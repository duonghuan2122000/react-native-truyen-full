import cheerio from 'cheerio-without-node-native';

// Hàm lấy truyện vừa cập nhật
// @params:
//  - url: 'url truyện mới cập nhật trên TruyenFull'
// @returns:
//  [
//    {imgStory: '', nameStory: '', urlStory: ''},
//    ...
// ]
export const getUpdateStory = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        var updatedStories = [];
        let rowStories = $('#list-page .col-truyen-main .list .row');
        rowStories.each((_, div) => {
          let imgStory = $(div)
              .find('.col-xs-3 div[data-image]')
              .attr('data-image'),
            nameStory = $(div)
              .find('h3.truyen-title a')
              .text(),
            urlStory = $(div)
              .find('h3.truyen-title a')
              .attr('href');
          updatedStories.push({imgStory, nameStory, urlStory});
        });
        resolve(updatedStories);
      })
      .catch(err => reject(err));
  });

// Hàm lấy thông tin chapter
// @param:
//  -url: Đường link chapter truyện. Ví dụ: https://truyenfull.net/tiem-tap-hoa-cua-nhoc-con/chuong-1/
// @return: trả về một Json
// {
//    chapter: 'Tên chương',
//    chapter_prev: 'url' | null,
//    chapter_next: 'url' | null,
//    content: 'Nội dung chương truyện',
//    nameStory: '',
// }
export const getInfoChapter = url =>
  new Promise((resolve, reject) => {
    var infoChapter = {
      chapter: '',
      chapter_prev: null,
      chapter_next: null,
      content: '',
      nameStory: '',
    };
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        infoChapter.chapter = $(
          '#wrap #chapter-big-container a.chapter-title',
        ).text();
        infoChapter.content = $('#chapter-c').html();
        infoChapter.chapter_prev =
          $('a#prev_chap').attr('href') != 'javascript:void(0)'
            ? $('a#prev_chap').attr('href')
            : null;
        infoChapter.chapter_next =
          $('a#next_chap').attr('href') != 'javascript:void(0)'
            ? $('a#next_chap').attr('href')
            : null;
        infoChapter.nameStory = $(
          '#chapter-big-container a.truyen-title',
        ).text();
        resolve(infoChapter);
      })
      .catch(err => reject(err));
  });

// Hàm lấy tất cả thể loại trên truyenfull
// @return: [
//    {name: 'cat1', url: 'url_cat1'},
//    {name: 'cat2', url: 'url_cat2'},
//    ...
//  ]
export const getAllCategories = url =>
  new Promise((resolve, reject) => {
    var cats = [];
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        let divCats = $('#wrap #nav .dropdown-menu .row .col-md-4');

        divCats.each((_, div) => {
          $(div)
            .find('ul.dropdown-menu li')
            .each((_, li) => {
              let tagA = $(li).find('a');
              cats.push({name: tagA.text(), url: tagA.attr('href')});
            });
        });

        resolve(cats);
      })
      .catch(err => reject(err));
  });

// Hàm lấy thông tin của truyện trên truyenfull
// @param:
//  - url: đường link của truyện. Ví dụ: https://truyenfull.net/tiem-tap-hoa-cua-nhoc-con/
// @return: trả về một Json
// {
//    name: 'Tên truyện',
//    imgStory: '',
//    cats: ['cat1', 'cat2', ...],
//    author: 'Tác giả',
//    source: 'Nguồn truyện',
//    status: 'Full' | 'Đang ra',
//    description: 'Tóm tắt truyện',
//    urlFirstChapter: 'link chapter đầu tiên của truyện',
//    truyenID: 0,
// }
export const getInfoStory = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        var infoStory = {
          name: '',
          imgStory: '',
          cats: [],
          author: '',
          source: '',
          status: '',
          description: '',
          urlFirstChapter: '',
          truyenID: 0,
        };
        infoStory.name = $(
          '#truyen > div.col-xs-12.col-sm-12.col-md-9.col-truyen-main > div.col-xs-12.col-info-desc > h3',
        ).text();
        infoStory.description = $('#truyen .col-info-desc .desc-text').html();
        infoStory.imgStory = $('.books > .book > img').attr('src');
        infoStory.urlFirstChapter = $('#list-chapter ul.list-chapter > li')
          .first()
          .find('a')
          .attr('href');
        infoStory.truyenID = $('input#truyen-id').val();
        let info = $('#truyen .col-truyen-main .info div');
        info.each((i, div) => {
          switch (i) {
            case 0:
              infoStory.author = $(div)
                .find('a')
                .text();
              break;
            case 1:
              $(div)
                .find('a')
                .each((_, a) => {
                  infoStory.cats.push($(a).text());
                });
              break;
            case 2:
              infoStory.source = $(div)
                .find('span')
                .text();
              break;
            default:
              infoStory.status = $(div)
                .find('span')
                .text();
              break;
          }
        });
        resolve(infoStory);
      })
      .catch(e => reject(e));
  });

// Hàm lấy tất cả chương hiện có của truyện
// @params:
//  - truyenID: id của truyện trên TruyenFull
//  - urlStory: url của truyện
// @returns:
//  [
//    {chapter: 'tên chapter', urlChapter: 'url của chapter đó'},
//    ...
//  ]
export const getAllChapters = (truyenID, urlStory) =>
  new Promise((resolve, reject) => {
    let url = `https://truyenfull.net/ajax.php?type=chapter_option&data=${truyenID}`;
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        let allChapters = [];
        $('select > option').each((_, optionTag) => {
          let chapterData = $(optionTag);
          allChapters.push({
            chapter: chapterData.text(),
            urlChapter: urlStory + chapterData.attr('value'),
          });
        });
        resolve(allChapters);
      })
      .catch(e => reject(e));
  });

// Hàm lấy truyện theo thể loại
// @params:
//  - url: 'url của thể loại trên TruyenFull'
// @returns:
//  [
//    {imgStory: '', nameStory: '', urlStory: ''},
//    ...
// ]
export const getStoriesByCategory = url =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        var stories = [];
        let rowStories = $('#list-page .col-truyen-main .list .row');
        rowStories.each((_, div) => {
          let imgStory = $(div)
              .find('.col-xs-3 div[data-image]')
              .attr('data-image'),
            nameStory = $(div)
              .find('h3.truyen-title a')
              .text(),
            urlStory = $(div)
              .find('h3.truyen-title a')
              .attr('href');
          stories.push({imgStory, nameStory, urlStory});
        });
        resolve(stories);
      })
      .catch(e => reject(e));
  });

// Hàm lấy truyện theo từ khóa tìm kiếm
// @params:
//  - keyword: từ khóa tìm kiếm
// @returns:
//  [
//    {imgStory: '', nameStory: '', urlStory: ''},
//    ...
// ]
export const getStoriesBySearch = keyword =>
  new Promise((resolve, reject) => {
    let url = `https://truyenfull.net/tim-kiem/?tukhoa=${keyword}`;
    fetch(url)
      .then(res => res.text())
      .then(html => cheerio.load(html))
      .then($ => {
        var stories = [];
        let rowStories = $('#list-page .col-truyen-main .list .row');
        rowStories.each((_, div) => {
          let imgStory = $(div)
              .find('.col-xs-3 div[data-image]')
              .attr('data-image'),
            nameStory = $(div)
              .find('h3.truyen-title a')
              .text(),
            urlStory = $(div)
              .find('h3.truyen-title a')
              .attr('href');
          stories.push({imgStory, nameStory, urlStory});
        });
        resolve(stories);
      })
      .catch(e => reject(e));
  });
