
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    padding: 0,
  },

  bar: {
    maxHeight: 105,
  },
  button: {
      borderRadius: 20,
    },
    links: {
      float: "left",
      color: "rgb(36, 34, 34)",
      paddingTop: 0,
      fontWeight: "bolder",
      textAlign: "center",
      marginTop: 0,
    },
  });

const ArchiveNav = () =>{
  const category = "others";

    //Search Catalog
    const searchCatalog = () =>{ 
        let searchInput = document.getElementById('article-searcher').value 
        searchInput=searchInput.toLowerCase(); 
        let allTitle = document.getElementsByClassName('list-group-item'); 
        
        for (let i = 0; i < allTitle.length; i++) { 
          if (!allTitle[i].innerHTML.toLowerCase().includes(searchInput)) { 
                  allTitle[i].parentElement.style.display="none";
          } 
          else {
            allTitle[i].parentElement.style.display="block";				 
          } 
        } 
      }
      const classes = useStyles();
        return(
            <div>
            <div className="navbar" >
              <Typography variant="h6" component="h7" >
                    <Link to={"/"} className={classes.links}>
                      <ListItemText primary="HOME" styles={{fontWeight:"bold"}}/>
                    </Link>
                          <div className="dropdown">
                            <span id="dd">
                            <button className="dropbtn">
                              <ListItemText primary="CATEGORIES" />
                            </button>
                            </span>
                              <div className="dropdown-content">
                                <Link to={"/category/Life"} className={classes.links}>
                                  <ListItemText primary="Life" />
                                </Link>
                                <Link to={"/category/career-business" + category}>
                                  <ListItemText primary="Career & Business" />
                                </Link>
                                <Link to={"/category/education" + category}>
                                  <ListItemText primary="Education" />
                                </Link>
                                <Link to={"/category/health" + category}>
                                  <ListItemText primary="Health" />
                                </Link>
                                <Link to={"/category/religion" + category}>
                                  <ListItemText primary="Religion" />
                                </Link>
                                <Link to={"/categorysex-sexualities" + category}>
                                  <ListItemText primary="Sex & Sexualities" />
                                </Link>
                                <Link to={"/category/travelling-lifestyle" + category} className={classes.links}>
                                  <ListItemText primary="Travelling & Lifestyle" />
                                </Link>
                                <Link to={"/category/science-universe" + category} className={classes.links}>
                                  <ListItemText primary="Science & Universe" />
                                </Link>
                                <Link to={"/category/quotes" + category} className={classes.links}>
                                  <ListItemText primary="Quotes" />
                                </Link>
                                <Link to={"/category/books-biography" + category} className={classes.links}>
                                  <ListItemText primary="Books & Biography" />
                                </Link>
                              </div>
                          </div>
                          <Link to={"/about-us"} className={classes.links}>
                            <ListItemText primary="ABOUT US" />
                          </Link>
                          <Link to={"/contact-us"} className={classes.links}>
                            <ListItemText primary="CONTACT US" />
                          </Link>
                          <div className="article-search">
                              <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.button}
                              >
                                  <SearchOutlinedIcon />
                                  Search
                              </Button>
                              <input
                                  type="text"
                                  id="article-searcher"
                                  className="searchbox"
                                  placeholder="Search Library"
                                  onKeyUp={searchCatalog}
                              />
                              {/**/}
                          </div>          
                  <div>
                      <p></p>
                  </div>
                </Typography>
                  </div>
            </div>

            

        )
}

export default ArchiveNav