import React from 'react';
import {ComponentMeta } from '@storybook/react';
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";



export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,

} as ComponentMeta<typeof EditableSpan>;

const changeCallBack = action("Value changed")
export const EditableSpanExample = () =>{
    return <EditableSpan title={"Start Value"} setNewTitle={changeCallBack}/>
}

