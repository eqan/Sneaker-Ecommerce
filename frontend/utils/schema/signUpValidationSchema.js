import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Name is Required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  // avatar: Yup.string().trim().required("Avatar Is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .matches(/[!^A-Za-z0-9]+/, "Password must contain only numbers and alphabets")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});


export default validationSchema