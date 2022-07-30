import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required"),
  });


export default validationSchema