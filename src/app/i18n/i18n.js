import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import {default as Constants} from '../constants';
const {DEFAULT_LNG} = Constants;

const i18n = i18next
    .use(LanguageDetector)
    .init({
        fallbackLng: DEFAULT_LNG,

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: false,

        interpolation: {
            escapeValue: false // not needed for react!!
        }
    }, (err) => {
        if (err) {
            console.error('i18next', err);
        }
        // console.log('i18next initialized and ready to go!');
    });

export default i18n;
