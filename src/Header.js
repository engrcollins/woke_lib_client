import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import header2 from './materials/header2.png'
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(Cookies.get('name'))
  const currentUser =  Cookies.get('name');
  const getUser = () => {
    if (typeof currentUser === 'string'){
      setLoggedIn(true)
    }else {
      console.log('no user')
    };
  }
    const  setDate = () => {
      const now = new Date();
      const mm = now.getMonth();
      const dd = now.getDay();
      const dt = now.getDate();
      const yyyy = now.getFullYear();
      const secs = now.getSeconds();
      const mins = now.getMinutes();
      const hrs = now.getHours();
      const monthName = [
        'January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'
      ];
      const dayName = [ 'Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday',
        'Saturday'
      ];
      
      var hours ="";
      var minutes="";
      var seconds="";

      var month="";
      var day="";
      var date="";
      var year="";
      var meridian ="";
      if (hrs > 12) {
        hours = hrs - 12;
        meridian = "pm";	
      } else {
        hours = hrs;
        if(hours === 12){
          meridian = "pm";
        }else{
          meridian = "am";
        }
      }

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (secs < 10) {
        seconds = '0' + secs;
      } else {
        seconds = secs;
      }
      
      if (mins < 10) {
        minutes= '0' + mins;
      } else {
        minutes = mins;
      }
      month = monthName[mm];
      day = dayName[dd];
      date = dt;
      year = yyyy;
      const presentDate = document.querySelector('.date');
      //present.innerHTML = 
      presentDate.innerHTML = `Date: ${day}, ${date} ${month} ${year}. | Time: ${hours}:${minutes}:${seconds}${meridian}`;
      //dt +" " +month +" " +year". | Time
      const copyright = document.querySelector('.copyright');
      copyright.innerHTML = year;
    }
    setInterval(setDate,1000);

    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
      iconise: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },

      righted:{
        position: 'absolute',
        right: 0,
      },

      barback: {
         backgroundColor: '#81d4fa'
        },
    }));

    const setUserStatus = () => {
      Cookies.remove('name');
      console.log("Cookies removed");
      history.push("/")
      window.location.reload(false);
    };
  

    const classes = useStyles();
    return(
      <div onLoad={getUser} style={{margin:"0px"}}>
        <AppBar className={classes.barback} position="static" padding-right="-1px" >
        <Toolbar  >
          <span className={classes.iconise} >
            <Avatar alt="Woke Library" src="web-logo.jpg" />
          </span>
        <TypoGraphy variant="h4" component="h6" className="web-title">WOKE LIBRARY
          </TypoGraphy>
          <span className="cub-span">
            <img alt="web-logo" src={header2} className="cub" />
          </span>
          </Toolbar>
        </AppBar>
        <div onClick={setDate} className="mid-header" align="center" id="welcome">
          { loggedIn ? ( <p className="welc-login">Welcome <Link to={"/profile/" + currentUser}>{currentUser}</Link> | <button onClick={setUserStatus}>LogOut</button></p>
          ):(
            <p className="welc-login">Welcome Reader | <Link to={"/join-library"}>Join Woke Library</Link> | <Link to={"/login"}>Login</Link></p>
            )} <p className="date"></p>
        </div>
      </div>
      );
    }

export default Header
