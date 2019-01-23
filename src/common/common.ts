import {Cookies} from '../util/cookie';
import { Store } from "redux";
/**
 * 国际化
 */
export class AppLocaleStatic {
    constructor(options: AppLocaleStatic) {
        this.locale = options.locale;
        this.formats = options.formats;
        this.defaultFormats = options.defaultFormats;
        this.defaultLocale = options.defaultLocale;
        this.messages = options.messages;
        this.antd = options.antd;
    }

    antd?: Object;
    locale?: string;
    formats?: Object;
    messages?: Object;
    defaultLocale?: string;
    defaultFormats?: Object;
}

export class Global {
    static store: Store<any>;
    static intl: ReactIntl.InjectedIntl;
}

export class AppContext {

    static Keys = {
        /**
         * LocalStorage的存储key
         */
        TokenDataKey: "AKTokenData",
        /**
         * Cookie的存储key
         */
        LoginSecretKey: "AkmiiSecret",
        /**
         * LocalStorage的存储key
         */
        AppInfoKey: "AKAppInfo",
        /**
         * 用于存储当前版本分支
         */
        BranchKey: "AKCurrentBranch",
        /**
         * 用于多语言key
         */
        LanguageKey: "ak-language",
        /**
         * 老版本使用key 后续将会抛弃
         */
        LoginHerperKey: "AKLoginHelperData",
        /**
         * 认证类型
         */
        AuthenticationType: "AKAuthenticationType",
        /**
         * 多设备标识    Mobile=手机端
         */
        MobileDevice: "MobileDevice"
    };
    /**
     * 获取当前语言,如果用户没有选择，默认走公司语言,兼容两个版版本
     */
    static getLanguage(): string {
        let language = Cookies.get(AppContext.Keys.LanguageKey) === "undefined" ? undefined : Cookies.get(AppContext.Keys.LanguageKey);
        /*        if (!language) {
         let data = AkContext.getMerchantData();
         if (data) {
         language = data.CompanyInfo.LanguageCode;
         }
         }*/
        return language;
    }
}
