import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import s from './Register.module.css'


type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Register = () => {

    console.log('register')

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

            return errors
        },
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div className={s.registerContainer}>
            <div className={s.registerFormBlock}>
                <h1>Sign Up</h1>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email ? true : false}
                        />
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            label="Password"
                            margin="normal"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.errors.password ? true : false}
                        />
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <TextField
                            label="Confirm password"
                            margin="normal"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            error={formik.errors.confirmPassword ? true : false}
                        />
                        {formik.errors.confirmPassword ? <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                        >Sign Up</Button>
                    </FormGroup>
                </form>
                <span>Already have an account?</span>
                <a href="#">Sign In</a>
            </div>
        </div>
    )
};
