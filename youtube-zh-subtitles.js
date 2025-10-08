// ==UserScript==
// @name                Youtube 中文字幕
// @name:zh-CN          Youtube 中文字幕全平台
// @version             1.0
// @author              shy1248
// @refer               https://github.com/jk278/youtube-dual-subtitle
// @match               *://www.youtube.com/*
// @match               *://m.youtube.com/*
// @require             https://unpkg.com/ajax-hook@latest/dist/ajaxhook.min.js
// @grant               none
// @run-at              document-start
// @icon                https://www.youtube.com/s/desktop/b9bfb983/img/favicon_32x32.png
// ==/UserScript==

/*
如果未自动加载，请切换字幕或关闭后再打开即可。默认语言为浏览器首选语言。
*/

(function () {
    'use strict';

    // 检测浏览器首选语言，如果没有，设置为英语
    const preferredLanguage = navigator.language.split('-')[0] || 'en';

    // 启用中文字幕
    function enableSubs() {
      ah.proxy({
        onRequest: (config, handler) => {
          handler.next(config); // 处理下一个请求
        },
        onResponse: (response, handler) => {
          // 如果请求的 URL 包含 '/api/timedtext' 并且没有 '&translate_h00ked'，则表示请求双语字幕
          if (response.config.url.includes('/api/timedtext') && !response.config.url.includes('&translate_h00ked')) {
            // 创建新的 XMLHttpRequest
            let xhr = new XMLHttpRequest();
            // 使用 RegExp 清除我们的 xhr 请求参数中的 '&tlang=...'，同时使用 Y2B 自动翻译
            let url = response.config.url.replace(/(^|[&?])tlang=[^&]*/g, '');
            url = `${url}&tlang=${preferredLanguage}&translate_h00ked`;
            xhr.open('GET', url, false); // 打开 xhr 请求
            xhr.send(); // 发送 xhr 请求
            response.response = xhr.response; // 使用翻译后的字幕
            }
          else {
            // 如果不是翻译字幕请求，直接返回响应
            response.response = response.response;
          }
          handler.resolve(response); // 处理响应
        }
      });
    }

    // 当文档加载完成并且字幕可用时，调用 enableSubs 函数启用中文字幕
    if (document.readyState === 'complete') {
      // 如果文档已经加载完成，则启用中文字幕
      enableSubs();
    } else {
      // 如果文档尚未加载完成，添加事件监听器以在加载完成时启用中文字幕
      window.addEventListener('load', enableSubs);
    }
  })();
