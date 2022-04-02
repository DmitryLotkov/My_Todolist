import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {App} from "../app/App";
import ReduxStoreProviderDecorator from "../ReduxStoreProviderDecorator";




export default {
    title: 'TODOLIST/AppOld',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// const Template: ComponentStory <typeof AppOld> = () => <AppOld/>

// export const AppWithReduxStory = Template.bind({});
//
// AppWithReduxStory.args = {}

export const AppWithReduxStory = () =>{
    return (<App/>)
}




