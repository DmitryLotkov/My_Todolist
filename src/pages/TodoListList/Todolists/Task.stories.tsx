import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import ReduxStoreProviderDecorator from "../../../ReduxStoreProviderDecorator";



export default {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory <typeof Task> = (args:any) => <Task {...args}/>

export const TaskStory = Template.bind({});


TaskStory.args = {
    toDoListID: "todolistId2",
    taskID: "1",
}





