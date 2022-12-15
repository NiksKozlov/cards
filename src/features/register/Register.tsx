import React, {useState} from "react";
import {
    Button,
    FormControl,
    FormGroup,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    styled,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import s from './Register.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {registration} from "./register-reducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Navigate, NavLink} from "react-router-dom";
import {red} from "@mui/material/colors";


type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Register = () => {

    const dispatch = useAppDispatch()

    const isRegistered = useAppSelector(st => st.register.isRegistered)

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorsType = {}

            if (!values.email) {
                errors.email = 'required'
            }

            if (!values.password) {
                errors.password = 'required'
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'required'
            }

            if (values.password !== values.confirmPassword) {
                errors.password = ''
                errors.confirmPassword = ''
                // errors.commonError = 'the entered passwords do not match'
            }

            return errors
        },
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            dispatch(registration(values.email, values.password))
        }
    })

    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                <h1>Sign Up</h1>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup sx={{width: '350px'}}>
                        <TextField
                            InputLabelProps={{className: s.textfieldLabel}}
                            inputProps={{className: s.textfieldMain}}
                            variant="standard"
                            label="Email"
                            margin="normal"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={!!formik.errors.email}
                        />
                        {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
                        <TextField
                            InputLabelProps={{className: s.textfieldLabel}}
                            inputProps={{className: s.textfieldMain}}
                            type={showPassword ? 'text' : 'password'}
                            variant="standard"
                            label="Password"
                            margin="normal"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={!!formik.errors.password}
                            InputProps={{
                                endAdornment: <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            }}
                        />
                        {formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : null}
                        <TextField
                            InputLabelProps={{className: s.textfieldLabel}}
                            inputProps={{className: s.textfieldMain}}
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="standard"
                            label="Confirm Password"
                            margin="normal"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            error={!!formik.errors.confirmPassword}
                            InputProps={{
                                endAdornment: <IconButton
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            }}
                        />
                        {formik.errors.confirmPassword ?
                            <div className={s.error}>{formik.errors.confirmPassword}</div> : null}
                        <button
                            className={s.submitBtn}
                            type={'submit'}
                            color={'primary'}
                        >
                            Sign Up
                        </button>

                    </FormGroup>
                </form>
                <span>Already have an account?</span>
                <NavLink to={'/login'} className={s.signInBtn}>Sign In</NavLink>
            </div>
        </div>
    )
};