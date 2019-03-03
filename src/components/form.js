import React, { Component } from 'react';
import spider from './spider.png';

class Form extends Component {
    state = {
        url: '',
        numberOfLevels: 1
    }
    makeCrawlRequest = () => {
        this.props.makeCrawlRequest(this.state.url, this.state.numberOfLevels);
    }

    updateUrl = (e) => {
        this.setState({...this.state, url: e.target.value});
    }

    updateLevels = (e) => {
        if(e.target.value >= '3'){
            alert("Please Note! we may require more time to crawl deeper into the site.");
        }
        this.setState({...this.state, numberOfLevels: e.target.value});
    }

    render() {
    return (
        <div className='user-form'>
            <h4>Type URL to Crawl :</h4>
            <input type='text' id='crawl_url' className='display-block full-width form-control' placeholder='http:// or https://' value={this.state.url} onChange={this.updateUrl}/>
            <h4>Select the Depth level of the Scan :</h4>
            <select type='text' id='crawl_url' className='form-control' onChange={this.updateLevels}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
            </select><br />
            <button className='btn btn-success' onClick={this.makeCrawlRequest}>
                Crawl
                <img src={spider} className='small-icon'/>
            </button>
        </div>
    );
    }
}

export default Form;
