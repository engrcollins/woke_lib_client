import React, { useState } from "react";
import './Form.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Grid,Typography, makeStyles, Paper} from "@material-ui/core";
import Library_userDataService from "../services/Library_userService";
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

const useStyles = makeStyles({
  root: {
    paddingLeft: -1,
    width: '99%',
    padding: 1,
    border: 1,
    borderColor: 'rgb(51, 173, 255)',
  },
  table: {
    minWidth: 420,
    maxWidth: 550,
  },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    warnings: {
      color: 'red',
      padding: 0,
    },
    success: {
      color: '#004d00',
    },
    
  });

const Registration= () => {
  const currentUser =  Cookies.get('name');
  if (typeof currentUser === 'string'){
    Cookies.remove('name')
    window.location.reload(false);
  }else {
      console.log('no user')
  };
  const initialLibrary_userState = {
    id: null,
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    createdAt: ""
  };
  const [library_user, setLibrary_user] = useState(initialLibrary_userState);
  const [submitted, setSubmitted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const [submit_error, setSubmit_error] = useState("");


  const handleInputChange = event => {
    const { name, value } = event.target;
    setLibrary_user({ ...library_user, [name]: value });
  };
   const toggleShow = event => {
       if (hidden){
           setHidden(false);
       }else{
           setHidden(true)
       };
  };

    const validateEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateForm = (value) => {
        const errors = {}
        if (!value.firstName) errors.firstName = "First name is required";
        if (!value.lastName) errors.lastName = "Last name is required";
        if (!value.gender) errors.gender = "Please select your gender";
        if (!value.birthDate) errors.birthDate = "Please input your Date of Birth";
        if (!value.username) errors.username = "Username is required";
        if (!value.phone) errors.username = "phone is required";
        if (!value.email) errors.email = "Email address is required";
        else if (!validateEmail(value.email)) errors.email = "Not a valid email address";
        if (!value.password) errors.password = "Password is required";
        else if (value.password === value.username) errors.password = "Please provide a password different from your username";
        else if (!value.confirmPassword) errors.confirmPassword = "Please repeat the password";
        else if (value.password !== value.confirmPassword) errors.confirmPassword = "Passwords don't match";

        return errors
        }

  const saveLibrary_user = () => {
    var data = {
      firstName: library_user.firstName,
      lastName: library_user.lastName,
      gender: library_user.gender,
      birthDate: library_user.birthDate.toLocaleString(),
      username: library_user.username,
      phone: library_user.phone,
      email: library_user.email,
      password: library_user.password,
      confirmPassword: library_user.confirmPassword,
      createdAt: new Date().toLocaleString(),
    };
    const errors = validateForm(data)
    setErrors(errors)
    if (!Object.keys(errors).length) {
      Library_userDataService.create(data)
      .then(response => {
        console.log(library_user.username)
        console.log(response.data)
        if ((library_user.username === response.data) && (typeof response.data === 'string')){
            console.log(library_user.username)
            console.log(response.data)
            window.alert(`Your username ${library_user.username} exists already, please try another username`);
            setLibrary_user(initialLibrary_userState);
        }else if ((library_user.email === response.data) && (typeof response.data === 'string')){
            console.log(library_user.email)
            console.log(response.data)
            window.alert(`Your email ${library_user.email} exists already, please try another email`);
            setLibrary_user(initialLibrary_userState);
        }else{
            setLibrary_user({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              gender: response.data.gender,
              birthDate: response.data.birthDate,
              username: response.data.username,
              phone: response.data.phone,
              email: response.data.email,
              password: response.data.password,
              createdAt: response.data.createdAt
            });
            setSubmitted(true);
            //console.log(response.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
      console.log(document.cookie);
    }
  };

  const classes = useStyles();
  return (
    <div className="">
    {console.log(document.cookie)}
    <Grid container>
        <Grid item align="center" xs={12} sm={8} lg={9}  spacing={1} component={Paper}  className={classes.root}>
        <div className="library-form">
        {submitted ? (
          <div>
            <Typography variant="body1" display="block" className={classes.success} gutterBottom>
            <CheckCircleTwoToneIcon style={{fontSize:'26px', padding:'-2px'}}/>
            Registration successful! Your Woke Library username is <b>{library_user.username}.</b>
            </Typography>
            <br />
            <Link to={"/login"}>
              Login to Woke Library
            </Link>
            </div>
      ) : (
        <div>
            <TableContainer align="center">
                <Table  className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2} align="center"><strong>Library Registration Form</strong>
                              </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="firstName">First Name: </label></TableCell>
                          <TableCell align="left"><input
                              type="text"
                              className="input-field"
                              id="firstName"
                              required
                              placeholder="Type your first name here"
                              value={library_user.firstName}
                              onChange={handleInputChange}
                              name="firstName"
                          />
                              <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                                {errors.firstName && <p>{errors.firstName}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="lastName">Last Name: </label></TableCell>
                          <TableCell align="left"><input
                              type="text"
                              className="input-field"
                              id="lastName"
                              required
                              placeholder="Type your last name here"
                              value={library_user.lastName}
                              onChange={handleInputChange}
                              name="lastName"
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.lastName && <p>{errors.lastName}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="gender">Gender: </label></TableCell>
                          <TableCell align="left"><select id="gender" required value={library_user.gender || ""}
                              onChange={handleInputChange} name="gender">
                              <option value="" disabled selected hidden>Please choose your gender...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Undisclosed">Prefer not to Disclose</option>           
                            </select>
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.gender && <p>{errors.gender}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="birthDate">Date of Birth: </label></TableCell>
                          <TableCell align="left"><TextField
                              id="birthDate"
                              label="Birthday"
                              type="date"
                              defaultValue="2000-01-24"
                              value={library_user.birthDate}
                              onChange={handleInputChange}
                              name="birthDate"
                              InputLabelProps={{
                              shrink: true,
                              }}
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.birthDate && <p>{errors.birthDate}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="username">Username: </label></TableCell>
                          <TableCell align="left"><input
                              type="text"
                              className="input-field"
                              id="username"
                              required
                              placeholder="Pick a username(min of 4 characters)"
                              value={library_user.username|| ""}
                              onChange={handleInputChange}
                              name="username"
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.username && <p>{errors.username}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>
                          
                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="phone">Phone: </label></TableCell>
                          <TableCell align="left"><input
                              type="text"
                              className="input-field"
                              id="phone"
                              required
                              placeholder="Input your mobile phone number"
                              value={library_user.phone|| ""}
                              onChange={handleInputChange}
                              name="phone"
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                                {errors.phone && <p>{errors.phone}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="email">e-mail: </label></TableCell>
                          <TableCell align="left"><input
                              type="text"
                              className="input-field"
                              id="email"
                              required
                              placeholder="Input your email address"
                              value={library_user.email|| ""}
                              onChange={handleInputChange}
                              name="email"
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.email && <p>{errors.email}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="password">Password: </label></TableCell>
                          <TableCell align="left"><input
                              type={hidden ? "password" : "text"}
                              className="input-field"
                              id="password"
                              required
                              placeholder="Pick a password(min of 8 characters)"
                              value={library_user.password|| ""}
                              onChange={handleInputChange}
                              name="password"
                          />
                            <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                              {errors.password && <p>{errors.password}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>

                          <TableRow>
                          <TableCell align="left"><label className="labelling" htmlFor="confirmPassword">Confirm Password: </label></TableCell>
                          <TableCell align="left" ><input
                              type={hidden ? "password" : "text"}
                              className="input-field"
                              id="confirmPassword"
                              required
                              placeholder="Retype your password here"
                              value={library_user.confirmPassword|| ""}
                              onChange={handleInputChange}
                              name="confirmPassword"
                          />
                            &ensp;<button onClick={toggleShow}>{hidden ? (<VisibilityOffIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}}/>) : (<VisibilityIcon style={{fontSize:'20px', width: '11px', height: '11px', padding:'-2px'}} />)}
                            </button>
                          <Typography variant="caption" display="block" className={classes.warnings} gutterBottom>
                                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                                </Typography>
                          </TableCell>
                          </TableRow>
                      </TableBody>
                      </Table>

                      <p>{submit_error}</p>
                      <button onClick={saveLibrary_user} className="btn btn-success">
                      Submit
                      </button>
                      <br/>
                  </TableContainer>
                </div>
            )}
            </div>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}  spacing={1} component={Paper}  className={classes.root}>
          
          </Grid>
        </Grid>
      </div>
  );
};

export default Registration;
