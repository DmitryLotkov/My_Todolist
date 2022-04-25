import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../state/state";

export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    type FormikErrorType = {
        email: string
        password: string
        rememberMe: boolean
        captcha: string
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validate: (values) => {
            const errors: Partial<Omit<FormikErrorType, "captcha">> = {}; //Partial type создает тии из родительсткого с необязательными параметрами
            if (!values.email) { // Omit type создает тип с выбраным отсутствующим свойством в примере "captcha"
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is Required';
            } else if (formik.values.password.length < 3) {
                errors.password = 'Password length must be at least 3 symbols';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })
    if(isLoggedIn){
        return <Navigate to={"/"}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>

            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           rel="noreferrer" target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email"
                                   type="email"
                                   margin="normal"
                                   {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps("password")}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          checked={formik.values.rememberMe}
                                          {...formik.getFieldProps("rememberMe")}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>

        </Grid>
    </Grid>
}
