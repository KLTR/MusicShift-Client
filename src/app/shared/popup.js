const defaultOptions = {
    popupWidth: 700,
    popupHeight: 600
};

export default function Popup(options) {
    const popup = window.open(options.url, options.popupName, [
        `height=${defaultOptions.popupHeight}`,
        `width=${defaultOptions.popupWidth}`,
        `top=${(screen.height / 2 - options.popupHeight / 2)}`,
        `left=${(screen.width / 2 - options.popupWidth / 2)}`
    ].join(','));

    if (window.focus) { popup.focus(); }

    return popup;
}
