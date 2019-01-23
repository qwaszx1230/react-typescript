import * as React from 'react';
import {withRouter} from 'react-router';


export interface RouterTestProps {
}
export interface RouterTestStates {
}


export class RouterTest extends React.Component<RouterTestProps, RouterTestStates> {
    render() {
        return <div>{'asdasd'}</div>;
    }
}

export default withRouter(RouterTest);
