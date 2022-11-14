import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../state/state";
import {isLoggedInSelector} from "./selectors";

type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export const Login = () => {
    const isLoggedIn = useAppSelector<boolean>(isLoggedInSelector)
    const dispatch = useAppDispatch();
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
            const errors: Partial<Omit<FormikErrorType, "captcha">> = {}; //Partial type создает тип из родительсткого с необязательными параметрами
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

        onSubmit: async (values:FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(loginTC(values))
            if(loginTC.rejected.match(action)){
                if(action.payload?.fieldErrors?.length){
                    const error = action.payload?.fieldErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                } else{

                }

            }

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
                                          checked={formik.getFieldProps("rememberMe").value}
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
