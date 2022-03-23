import React from 'react';
import {ComponentMeta} from '@storybook/react';

import {AppWithRedux} from "./AppWithRedux";
import ReduxStoreProviderDecorator from "./ReduxStoreProviderDecorator";




export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// const Template: ComponentStory <typeof AppWithRedux> = () => <AppWithRedux/>

// export const AppWithReduxStory = Template.bind({});
//
// AppWithReduxStory.args = {}

export const AppWithReduxStory = () =>{
    return (<AppWithRedux/>)
}




