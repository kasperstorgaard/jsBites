(function () {
    var JS_SNIPPET_PATH = 'js/snippets',
        HTML_SNIPPET_PATH = 'views/snippets',
        jsInsertContainer,
        htmlInsertContainer;

    document.addEventListener("DOMContentLoaded", function () {
        var hash = getHash();

        if (!hash) {
            return;
        }

        var split = hash.split('|'),
            splitLen = split.length,
            dependencies = split.slice(0, splitLen - 1),
            name = split.slice(splitLen - 1, splitLen)[0];

        loadScript(name, dependencies);
        loadHtml(name);
    });

    function getHash() {
        var hash = window.location.hash;
        return hash && hash.length > 1 ? hash.substr(1) : null;
    }

    function loadScript(scriptName, dependencies) {
        var url = '/' + JS_SNIPPET_PATH + '/' + scriptName + '.js';

        if (dependencies) {
            var dependenciesLoaded = window._console.loadScript(dependencies);

            Promise.all(_.compact(dependenciesLoaded))
                .then(function() {
                    return loadFile(url);
                })
                .then(insertScript);
        } else {
            loadFile(url)
                .then(insertHtml);
        }
    }

    function loadHtml(scriptName) {
        var url = '/' + HTML_SNIPPET_PATH + '/' + scriptName + '.html';

        loadFile(url).then(insertHtml);
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