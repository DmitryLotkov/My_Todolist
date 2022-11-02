import React, {useEffect} from 'react';
import './App.scss';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import {TodoListList} from "../pages/TodoListList/Todolists/TodoListList";
import AppBar from '@mui/material/AppBar/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../state/state";
import {RequestStatusType} from "../state/app-reducer";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../auth/Login";
import {CircularProgress, Container} from "@mui/material";
import {useDispatch} from "react-redux";
import {initializeAppTC, logOutTC} from "../auth/login-reducer";
import {statusSelector} from "./selectors";
import {authSelectors} from "../auth";




export const App = () => {
    const dispatch = useDispatch();
    const status = useAppSelector<RequestStatusType>(statusSelector);
    const isLoggedIn = useAppSelector<boolean>(authSelectors.isLoggedInSelector);
    const isInitialized = useAppSelector<boolean>(authSelectors.isInitializedSelector);

    useEffect(() => {
        dispatch(initializeAppTC())
    },[dispatch]);

     if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
         </div>
     }
    const logOutHandler = () => {
        dispatch(logOutTC())
    }

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
                    {!isLoggedIn ? <Button color="inherit">Login</Button> :
                        <Button onClick={logOutHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
            {
                status === "loading" &&
                <LinearProgress style={{width: "100%", position: "absolute", top: "px"}} color={"secondary"}/>
            }
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodoListList/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"/My_Todolist"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={"*"} element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    );
}



