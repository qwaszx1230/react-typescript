import { addLocaleData } from "react-intl";
import * as en from "react-intl/locale-data/en";
import * as zh from "react-intl/locale-data/zh";
import * as antdEn from "antd/lib/locale-provider/en_US";
import * as antdZH from "antd/lib/locale-provider/zh_TW";
import {AppLocaleStatic} from '../common/common';

export async function loadLocale(language?: string): Promise<AppLocaleStatic> {
    if (!language) {
        let DEFAULT_LOCALE = 'zh-CN';
        language = navigator.language || (navigator as any).browserLanguage || DEFAULT_LOCALE;
    }
    let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
    let appLocaleStatic: AppLocaleStatic;
    return new Promise<AppLocaleStatic>((resolve: (locale) => void, reject: (reason: any) => void) => {
        switch (languageWithoutRegionCode) {
            case 'en':
                addLocaleData([...en]);
                // require.ensure([], () => {
                appLocaleStatic = new AppLocaleStatic({
                    locale: languageWithoutRegionCode,
                    messages: appLocaleStatic,
                    antd: antdEn
                });
                appLocaleStatic.messages = require("./en.json");
                resolve(appLocaleStatic)
                // }, "en.json");
                break;
            case 'zh':
            default:
                addLocaleData([...zh]);
                // require.ensure([], () => {
                appLocaleStatic = new AppLocaleStatic({
                    locale: languageWithoutRegionCode,
                    messages: appLocaleStatic,
                    antd: antdZH
                });
                appLocaleStatic.messages = require("./zh.json");
                resolve(appLocaleStatic);
                // }, "zh.json");
                break;
        }
    });
}
