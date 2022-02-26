import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "./Task";
import ReduxStoreProviderDecorator, {taskID2} from "./ReduxStoreProviderDecorator";




export default {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

const Template: ComponentStory <typeof Task> = (args:any) => <Task {...args}/>

export const TaskStory = Template.bind({});

TaskStory.args ={
    toDoListID: "todolistId1",
    taskID: taskID2,
}




