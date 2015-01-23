(function () {
    var JS_SNIPPET_PATH = 'js/snippets',
        HTML_SNIPPET_PATH = 'views/snippets',
        NAME_END_STR = '&',
        jsInsertContainer,
        htmlInsertContainer,
        jsScriptHeader;

    document.addEventListener("DOMContentLoaded", function () {
        var hash = getHash();

        if (!hash) {
            return;
        }

        var name = (hash.split(NAME_END_STR))[0];

        loadScript(name);
        loadHtml(name);
    });

    function getHash() {
        var hash = window.location.hash;
        return hash && hash.length > 1 ? hash.substr(1) : null;
    }

    function loadScript(fileName) {
        var url = '/' + JS_SNIPPET_PATH + '/' + fileName + '.js';

        setScriptHeader(fileName);

        loadFile(url)
            .then(insertScript)
            .catch(function(error){
                console.log('file: "'+url+'" failed to load');
            })
    }

    function loadHtml(fileName) {
        var url = '/' + HTML_SNIPPET_PATH + '/' + fileName + '.html';

        loadFile(url)
            .then(insertHtml)
            .catch(function(error){
                console.log('file: "'+url+'" failed to load');
            });
    }

    function loadFile(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        });
    }

    function setScriptHeader(text) {
        jsScriptHeader = jsScriptHeader || document.getElementById('script-text');
        jsScriptHeader.innerHTML = text.replace(new RegExp('_', 'g'), ' ');
    }

    function insertScript(script) {
        jsInsertContainer = jsInsertContainer || document.getElementById('js-container');
        jsInsertContainer.innerHTML = script;

        window.hljs.highlightBlock(jsInsertContainer);
    }

    function insertHtml(html) {
        htmlInsertContainer = htmlInsertContainer || document.getElementById('html-container');
        htmlInsertContainer.innerHTML = html;
    }
}());
