import React, { Component } from 'react';
import logo from './my_logo.PNG';

class SiteHeader extends Component {
  render() {
    return (
        <div className='App-header'>
            <img src={logo} alt='My LOGO' className='fit-img right-margin left-margin-10'/>
            <h1>Web Crawler</h1>
            <p className='display-block small-font text-align-right'>
              <a href="https://www.linkedin.com/in/varungv" target="_blank">
              By Varun,Gubbi Vijayananda
              </a>
            </p>
        </div>
    );
  }
}

export default SiteHeader;
