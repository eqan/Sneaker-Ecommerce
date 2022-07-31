import React from 'react'
import {Box, Paper, Avatar,Grid, FormControl, InputLabel, NativeSelect, Typography, Button, TextField} from "@material-ui/core"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Background from "../src/images/signup.svg";
import styles from "../styles/Authentication.module.css"
import validationSchema from '../utils/schema/signUpValidationSchema'
import { Formik, Form} from 'formik';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login=()=>{
  let navigate = useNavigate();
  const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
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


    return(
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
            <div style={{marginTop: '5%', marginLeft: '5%', width: "100%"}}>
                <div className={styles.left}>
                    <img src={Background} className={{...styles.img}} alt="image"/>
                </div>

            </div>

        <div className={styles.split + ' '+  styles.right}>
        <div className={styles.centered}>
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
            <Box>
                <TextField label="Name" name="name" type="text"
                style={{width: "200px"}}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name} />
                {errors.name && displayToastError(errors.name)}
                <br/>
                <TextField label="Email" name="email" type="email"
                style={{width: "200px"}}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email} />
                {errors.email && displayToastError(errors.email)}
                <br/>
                <FormControl
                    style={{width: "200px"}}
                >
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
                style={{width: "200px"}}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                />
                {errors.password && displayToastError(errors.password)}
                <br/>
                <TextField
                style={{width: "200px"}}
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
            <Button   style={{width: "150px", margin:'8px 0'}} 
            color="primary" variant="contained"
                type="submit" disabled={isSubmitting}>
                Submit
            </Button>
            </Box>
            </Paper>
            </Grid>
        </div>
        </div>
              <ToastContainer />
                  </Form>)}
                </Formik>
      </>
    )
}

export default Login