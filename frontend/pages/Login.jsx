import React from 'react'
import { Box, Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Background from "../src/images/login.svg";
import styles from "../styles/Authentication.module.css"
import validationSchema from '../utils/schema/loginValidationSchema';
import { Formik, Form} from 'formik';
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {url} from '../utils/UrlLink'

const Login=()=>{
  let navigate = useNavigate();
  const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
    function authenticateUserNameAndPassword(values)
    {
      axios.post(`${url}/auth/login`, {
        email: values.email,
        password: values.password
      })
      .then(function (response) {
        console.log(response)
        if(response.data)
        {
          console.log(response)
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


    return(
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
        <div style={{marginTop: '2%', marginLeft: '5%', width: "100%"}}>
        <div className={styles.left}>
            <img src={Background} styles={styles.img} alt="image"/>
        </div>
        </div>
        <div className={styles.split + ' ' + styles.right}>
        <div className={styles.centered}>
        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <Box>
                  <TextField label="Email" name="email" type="email"
                  style={{width: "150px"}}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} />
                  {errors.email && displayToastError(errors.email)}
                  <br/>
                  <TextField label="Password" name="password" type="password"
                  style={{width: "150px"}}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  />
                  {errors.password && displayToastError(errors.password)}
                  <br/>
                  <br/>
              <Button  style={{width: "100px", margin:'8px 0'}} 
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