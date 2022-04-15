import React, {ChangeEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import style from './AddItemForm.module.css';


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(({addItem}: AddItemFormType)=> {

    let [inputData, setInputData] = useState("");
    let [error, setError] = useState<string | null>(null);

    const addLetter = () => {
        if (inputData.trim() !== "") {
            addItem(inputData);
        } else {
            setError("Title is required!");
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
        <div className={style.addItemFormWrapper}>
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
            <div className={style.addItemButton}>
                <IconButton onClick={addLetter}>
                <AddCircleIcon color={"primary"}/>
            </IconButton>
            </div>
        </div>

    );
})