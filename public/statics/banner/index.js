(function () {
    'use strict';

    function addStyle(link) {
        const stylesLink = document.createElement('link');
        stylesLink.href = link;
        stylesLink.setAttribute('rel', 'stylesheet');
        stylesLink.setAttribute('type', 'text/css');
        document.head.appendChild(stylesLink);
    }

    function handleResize() {
        if (window.top === window) {
            return;
        }
        const height = document.documentElement.scrollHeight;
        const available = document.documentElement.clientHeight;
        const required = document.body.clientHeight;
        if (required > available || height > required) {
            window.parent.postMessage({ height: required }, '*');
        }
    }

    function bannerHref(deFrame) {
        if (deFrame) {
            return location.href;
        }
        const canonical = document.querySelector('link[rel="canonical"]');
        return canonical ? canonical.href : 'https://andretorgal.com/';
    }

    function bannerTitle(deFrame) {
        if (deFrame) {
            return 'detach from site';
        } else if (document.querySelector('link[rel="canonical"]')) {
            return 'open back in andretorgal.com';
        }
        return 'visit andretorgal.com';
    }

    function createBanner(deFrame) {
        const href = bannerHref(deFrame);
        const contents = deFrame
            ? '<span class="pop-out">&#9650; pop</span>'
            : '<span>André Torgal</span>';
        const target = deFrame ? 'target="_top"' : '';
        const title = bannerTitle(deFrame);
        const container = document.createElement('div');
        container.innerHTML = `<div id="at-banner-wrapper">
      <div id="at-banner">
        <a ${target} href="${href}" title="${title}">${contents}</a>
      </div>
    </div>`;
        addStyle('https://statics.andretorgal.com/banner/index.css');
        document.body.appendChild(container.firstChild);
    }

    function main() {
        const inFrame = window.top !== window;
        createBanner(inFrame);
        if (inFrame) {
            handleResize();
            window.addEventListener('resize', handleResize);
        }
    }

    window.addEventListener('load', main);
})();
