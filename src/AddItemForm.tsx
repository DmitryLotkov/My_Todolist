import React, {ChangeEvent, useState} from "react";

type AddItemFormType = {

    addItem: (title: string) => void
}
export function AddItemForm(props: AddItemFormType){

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
            <input placeholder={"Enter a title..."}
                   autoFocus={true}
                   className={error && "red"}
                   onKeyPress={onKeyPressHandler}
                   value={inputData}
                   onChange={onchangeHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error"}>{error}</div>}
        </div>
    );
}