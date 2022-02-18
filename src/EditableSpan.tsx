import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditablePropsType = {
    title: string
    setNewTitle: (title: string) => void
}
export function EditableSpan (props:EditablePropsType){

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title)
    const OnEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false);
        props.setNewTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === "Enter"){
            offEditMode();
        }
    }
    return (
        editMode ?
            <TextField className={"editableSpan"} value={title}
                       onKeyPress={onKeyPressHandler}
                       autoFocus={true}
                       onBlur={offEditMode}
                       onChange={onChangeHandler}/> :
            <span onDoubleClick={OnEditMode}>{title}</span>

    )
}