import * as React from 'react';
import {LocaleProvider} from 'antd';
import {IntlProvider, injectIntl} from "react-intl";
import {loadLocale} from './locales/index';
import {AppLocaleStatic, Global, AppContext} from './common/common';
import {Provider} from "react-redux";
import {MasterPage} from './masterpage';

export interface BasePageProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
    requireMasterpage?: boolean;
    showMasterLeft?: boolean;
}
export interface BasePageStates {
    appLocale?: AppLocaleStatic;
}
export class BasePage extends React.Component<BasePageProps, BasePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null
        };
    }

    //默认从cookie加载个人设置的语言，没有cookie时，从企业的preferred语言加载。
    componentDidMount() {
        let topThis = this;
        let language = AppContext.getLanguage();
        topThis.loadLanguage(language);

    }

    loadLanguage(language?: string) {
        const theme = '';
        return new Promise((resolve, reject) => {
            loadLocale(language ? language : "zh").then(data => {
                if (this.props.onLoaded) {
                    this.props.onLoaded(data, theme).then(d => {
                        data.messages = {...data.messages, ...d};
                        this.setState({appLocale: data}, () => resolve());
                    });
                } else {
                    this.setState({appLocale: data}, () => resolve());
                }
            });
        });
    }

    GlobalIntlInject = injectIntl((props, options) => {
        Global.intl = props.intl;
        if (this.props.requireMasterpage) {
            return <div className="ak-container">
                <MasterPage showMasterLeft={this.props.showMasterLeft}
                            onLanguageChange={(language?: string) => {
                                this.loadLanguage(language);
                            }}>
                    {this.props.children}
                </MasterPage>
            </div>;
        } else {
            return <div className="ak-container">{this.props.children}</div>;
        }
    });

    render() {
        const {appLocale} = this.state;
        let content = appLocale ? <LocaleProvider locale={appLocale.antd}>
            <IntlProvider
                key={appLocale.locale}
                locale={appLocale.locale}
                messages={appLocale.messages}>
                <this.GlobalIntlInject />
            </IntlProvider>
        </LocaleProvider>
            : <div>
            </div>;
        return <Provider store={Global.store}>
            {content}
        </Provider>;
    }
}
