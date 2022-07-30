import React from 'react'
import validationSchema from '../utils/schema/loginValidationSchema';
import { Formik, Form} from 'formik';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Box, Typography, Button, TextField} from "@material-ui/core"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    let navigate = useNavigate();
    function authenticateUserNameAndPassword(values)
    {
      axios.post('https://fakse-store-api.herokuapp.com/api/v1/auth/login', {
        email: values.email,
        password: values.password
      })
      .then(function (response) {
        if(response.data)
        {
          localStorage.setItem('access_token', response.data.access_token);
          toast.success("Login Successfull")
          navigate('/home')
        }
      })
      .catch(function (error) {
          toast.error("Login Unsuccessful")
        console.log(error);
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
              email: "",
              password: "",
          }}
        validationSchema={validationSchema}
         onSubmit={(values, { setSubmitting}) => {
          console.log(values);
          // errors.map((error => {toast.error(error)}))
           setTimeout(() => {
             authenticateUserNameAndPassword(values);
             setSubmitting(false);
           }, 400);
         }}
       >
      {({ isSubmitting, errors, handleChange, handleBlur,values }) => (
           <Form>
              <Box>
              <Typography variant="h2" my={4} fontSize="bold">
                Login
              </Typography>
                  <TextField label="Email" name="email" type="email"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} />
                  {errors.email && displayToastError(errors.email)}
                  <br/>
                  <TextField label="Password" name="password" type="password"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  />
                  {errors.password && displayToastError(errors.password)}
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