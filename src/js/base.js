// rem.js
export default function setRem (doc, win) {
  console.log("我被调用了")
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth > 750) {
        // docEl.style.fontSize = '28px';
      } else {
        docEl.style.fontSize = (clientWidth / 375) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}
