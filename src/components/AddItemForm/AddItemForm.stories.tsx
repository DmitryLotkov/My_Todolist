import React from 'react';
import {ComponentMeta } from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";



export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,

} as ComponentMeta<typeof AddItemForm>;

const callBack = action("Button `Add` was pressed inside the form")
export const AddItemFormBaseExample = () =>{
    return <AddItemForm addItem={callBack}/>
}




