import i18n from './i18n';
import appLocales from './locales';

const locales = Object.assign({}, appLocales);

i18n.locales = appLocales;

export {
    i18n,
    locales
};

export default i18n;
