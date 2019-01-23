import * as React from 'react';
import {render} from "react-dom";
import router from './config/router';
import {BasePage} from './basepage';

require.ensure([], () => {
    require("./themes/main.less");
}, "main.css");

render(<BasePage requireMasterpage={true}>{router}</BasePage>, document.getElementById('app_content'));
