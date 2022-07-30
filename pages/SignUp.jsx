import React from 'react'
import validationSchema from '../utils/schema/signUpValidationSchema'
import { Formik, Form} from 'formik';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Box, FormControl, InputLabel, NativeSelect, Typography, Button, TextField} from "@material-ui/core"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
let navigate = useNavigate();
    
// [POST] https://api.escuelajs.co/api/v1/users/ -> API to add user
function addUser(value)
{
    const options = {
        url: "https://fakse-store-api.herokuapp.com/api/v1/users/",
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
        avatar: value.avatar
        },
    };
    axios(options)
    .then((response) => {
            toast.success("Registration successful!");
            navigate('/login');
        })
    .catch(error => {
            console.log(error);
            toast.error("Registration Unsuccessful!");
        });
}

const displayToastError = (error) => {
    toast.error(error, {
      toastId: error
    });
}


  return (
    <>
     <Formik
        initialValues={{
            name: "",
            email: "",
            role: "",
            avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y",
            password: "",
            confirmPassword: ""
        }}
       validationSchema={validationSchema}
       onSubmit={(values, { setSubmitting}) => {
        console.log(values);
        // errors.map((error => {toast.error(error)}))
         setTimeout(() => {
           addUser(values);
           setSubmitting(false);
         }, 400);
       }}
     >
    {({ isSubmitting, errors, handleChange, handleBlur,values }) => (
         <Form>
            <Box>
            <Typography variant="h2" my={4} fontSize="bold">
                Sign Up
            </Typography>
                <TextField label="Name" name="name" type="text"
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name} />
                {errors.name && displayToastError(errors.name)}
                <br/>
                <TextField label="Email" name="email" type="email"
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email} />
                {errors.email && displayToastError(errors.email)}
                <br/>
                <FormControl>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Select Role
                    </InputLabel>
                    <NativeSelect
                        onChange={handleChange('role')}
                        onBlur={handleBlur('role')}
                        name="role"
                        inputProps={{
                            name: 'role',
                          }}
                        value={values.role}
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </NativeSelect>
                </FormControl>
                <br/>
                <TextField label="Password" name="password" type="password"
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                />
                {errors.password && displayToastError(errors.password)}
                <br/>
                <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                />
                {errors.confirmPassword && displayToastError(errors.confirmPassword)}
                <br/>
                <br/>
            <Button  
            color="primary" variant="contained"
                type="submit" disabled={isSubmitting}>
                Submit
            </Button>
            <ToastContainer />
            </Box>
         </Form>
       )}
     </Formik>
    </>
  )
}