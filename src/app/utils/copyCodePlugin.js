/**
 * Copy code Plugin
 * Created by liangxinwei on 17-12-5.
 */

function selectElementText(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function getSelectedText() {
    let t = '';
    if (window.getSelection) {
        t = window.getSelection();
    } else if (document.getSelection) {
        t = document.getSelection();
    } else if (document.selection) {
        t = document.selection.createRange().text;
    }
    return t;
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text);
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        let textarea = document.createElement('textarea');
        textarea.textContent = text;
        textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand('copy');  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn('Copy to clipboard failed.', ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/**
 * 用法
 */
// const codeContainer = document.querySelector('.CodeMirror-code');
// const selectedText = getSelectedText();
// copyToClipboard(selectedText);
// selectElementText(codeContainer);

export {copyToClipboard};
