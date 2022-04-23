import React from 'react';
import './App.scss';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import {TodoListList} from "../pages/TodoListList/TodoListList";
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../state/state";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";


export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    return (
        <div className={"App"}>
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" &&
            <LinearProgress style={{width: "100%", position: "absolute", top: "px"}} color={"secondary"}/>
            }
            <TodoListList/>
            <ErrorSnackBar/>
        </div>
    );
}



