import * as React from 'react';
import {withRouter} from 'react-router';
import {injectIntl, InjectedIntlProps} from "react-intl";


export interface StoreProps {
}
export interface StoreStates {
}


export class Store extends React.Component<StoreProps, StoreStates> {
    render() {
        return <div>{'Store1'}</div>;
    }
}

export default injectIntl(withRouter(Store));
