import React, {ChangeEvent, useState} from "react";
import {IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from "@material-ui/core/TextField";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(({addItem}: AddItemFormType)=> {
    console.log("AddItemForm");

    let [inputData, setInputData] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addLetter = () => {
        if (inputData.trim() !== "") {
            addItem(inputData);
        } else {
            setError("Title is required!")
        }
        setInputData("");
    }

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {


        setInputData(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {

        if(error){
            setError(null)
        }

        if (e.key === "Enter") {
            addLetter();
        }
    }

    return (
        <div>
            <TextField
                label={"Enter a title..."}
                autoFocus={true}
                error={!!error}
                onKeyPress={onKeyPressHandler}
                value={inputData}
                onChange={onchangeHandler}
                variant={"outlined"}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addLetter}>
                <AddCircleIcon color={"primary"}/>
            </IconButton>
        </div>
    );
})