export function fakeClick(obj) {
    var ev = document.createEvent('MouseEvents');
    ev.initMouseEvent(
        'click', true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

/**
 * 保存文件到本地
 * @param file {String} 要保存的文件数据
 * @param fileName {String} 文件名
 * @returns {boolean} 是否保存成功
 */
export function saveFileToLocal(file, fileName) {
    const fileBlob = new Blob([file]);
    // 浏览器对download属性的兼容性
    // NOTE: IE 全部不支持 a[download]，Microsoft Edge 支持
    // ChromeFrame 支持 a[download]，但依然无法下载
    const UA = navigator.userAgent;
    const isIE = UA.indexOf('MSIE') > -1 || UA.indexOf('Trident') > -1;
    const isChromeFrame = typeof window.externalHost !== 'undefined';
    const isSupportDownload = 'download' in document.createElement('a');
    if (isIE || isChromeFrame || !isSupportDownload) {
        // 使用 FileSaver 插件
        if (window.saveAs) {
            window.saveAs(fileBlob, fileName);
            return true;
            // message.success(i18n.t('saveFile:export_success_tip'), 2);
        } else {
            console.warn('当前浏览器不支持文件保存！');
            return false;
        }
    } else {
        const urlObject = window.URL || window.webkitURL || window;
        const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = urlObject.createObjectURL(fileBlob);
        saveLink.download = fileName;
        fakeClick(saveLink);
        return true;
    }
}

/**
 * 打开本地文件
 * @param callback 打开本地文件后的回调函数
 */
export function openLocalFile(callback) {
    //创建input节点
    const inputFileEl = document.createElement('input');
    inputFileEl.setAttribute('id', 'openFileInput');
    inputFileEl.setAttribute('type', 'file');
    inputFileEl.setAttribute('style', 'display:none');
    document.body.appendChild(inputFileEl);
    //设置它的方法
    inputFileEl.addEventListener('change', function (event) {
        readFile(this.files, callback);
    }, false);
    inputFileEl.click();
    document.body.removeChild(inputFileEl);
}

/**
 *
 * @param files 要读取的文件列表
 * @param callback
 */
export function readFile(files, callback) {
    if (files && files[0]) {
        if (!window.FileReader) {
            console.warn('浏览器不支持文件读取');
            return false;
        }
        const file = files[0];
        const reader = new FileReader();
        // onload方法当reader执行readAsText方法时才会执行
        reader.onload = function (event) {
            let text = event.target.result.toString();
            let json;
            try {
                let arr = file.name.split('.');
                let suffix = arr[arr.length - 1];
                if (suffix.toLowerCase() !== 'json') {
                    console.error('Wrong file suffix');
                    callback({
                        status: 0,
                        msg: '请选择JSON类型文件'
                    });
                    return false;
                }
                json = JSON.parse(text);
                callback({
                    status: 1,
                    msg: '读取成功',
                    json: json
                });
            } catch (e) {
                console.error(e);
                callback({
                    status: 0,
                    msg: '请选择JSON类型文件'
                });
                return false;
            }
        };
        reader.readAsText(file);
    } else {
        console.warn('没有选择文件');
    }
}

