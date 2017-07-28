import zhCommon from './zh/common';
import enCommon from './en/common';
import zhBusiness from './zh/business';
import enBusiness from './en/business';

const locales = {
    zh: Object.assign(zhCommon, zhBusiness),
    en: Object.assign(enCommon, enBusiness)
};

export default locales;
