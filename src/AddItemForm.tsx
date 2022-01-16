import React, {ChangeEvent, useState} from "react";
import {IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import TextField from "@material-ui/core/TextField";

type AddItemFormType = {

    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    let [inputData, setInputData] = useState("");
    let [error, setError] = useState()

    const addItem = () => {
        debugger
        if (inputData.trim() !== "") {
            props.addItem(inputData);
        } else {
            setError("Title is required!")
        }
        setInputData("");
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value) {
            setError(null)
        }
        setInputData(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                label={"Enter a title..."}
                autoFocus={true}
                error={error}
                onKeyPress={onKeyPressHandler}
                value={inputData}
                onChange={onchangeHandler}
                variant={"outlined"}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addItem}>
                <AddCircleIcon color={"primary"}/>
            </IconButton>
        </div>
    );
}