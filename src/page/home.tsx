import * as React from 'react';
import {withRouter} from 'react-router';
import {injectIntl,InjectedIntlProps} from "react-intl";


interface HomeProps extends ReactRouter.RouteComponentProps<any, any>,InjectedIntlProps{}
interface HomeStates{}


class Home extends React.Component<HomeProps,HomeStates>{
    render(){
        return <div>{'这里是Home'}</div>;
    }
}

export default injectIntl(withRouter(Home));
