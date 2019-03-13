import React, { Component } from 'react';
import SiteHeader from './SiteHeader';
import CollapsiblePanel from './CollapsiblePanel';
import Form from './form';
import axios from 'axios';
import spinner from '../react-logo.svg';
import downloadCSVIcon from './icons/downloadCSV.png';

class PageComponent extends Component {
    state = {
        linkLinks: [],
        imageLinks: [],
        latestResponseTime: 0,
        isLoading: false
    }

    toggleSpinner = () => {
        this.setState({...this.state, isLoading: !this.state.isLoading});
    }

    downloadCSV = () => {
        var csv_data = 'LinkType,Link\n';
        this.state.linkLinks.forEach(link => {
            csv_data += 'Link,' + link + '\n';
        });
        this.state.imageLinks.forEach(link => {
            csv_data += 'Image,' + link + '\n';
        });
        var a = document.createElement('a');
        a.href = 'data:text/csv;charset=utf-16,' + encodeURI(csv_data);
        a.target = '_blank';
        a.download = 'Crawled_result_by_Gubbi.csv';
        a.click();
    }
    resetState = () => {
        this.setState({
            linkLinks: [],
            imageLinks: [],
            latestResponseTime: 0,
            isLoading: false
        });
    }

    makeCrawlRequest = (url, numberOfLevels) => {
        var req_payload = {
            url: [url],
            numberOfLevels: [numberOfLevels.toString()]
        }
        this.resetState();
        this.toggleSpinner();
        var t0 = performance.now();
        axios.post('http://localhost:8000/crawler/crawl/', req_payload)
            .then(res => {
                var t1 = performance.now();
                var response_time = ((t1-t0)/1000).toFixed(3);
                this.toggleSpinner();
                if(res.data.links && (res.data.links.links.length || res.data.links.images.length)){
                    this.setState({...this.state, linkLinks: res.data.links.links, imageLinks: res.data.links.images, latestResponseTime: response_time});
                }else{
                    alert("No Links Found");
                }
                if(res.data.msg){
                    alert(res.data.msg);
                }
            })
    }

    render() {
        return (
            <div className='dark-bg'>
                <SiteHeader></SiteHeader>
                <div className='alert alert-warning top-margin-10 padding-5'>
                    Note: We are skipping over any urls which are taking more than 3 seconds to maintan Performance
                </div>
                
                <Form makeCrawlRequest={this.makeCrawlRequest}/>
                    
                {this.state.isLoading ? (
                    <div className="spinner-div">
                        <img src={spinner} alt='Loading...' className='App-logo App-logo-spin'/>
                    </div>
                ) : (
                    <div className='left-padding-20'>
                        {this.state.linkLinks.length > 0 || this.state.imageLinks.length > 0 ? (
                            <div>
                                <div className='text-align-right'>
                                    <button className='btn btn-info margin-5' onClick={this.downloadCSV}>
                                        <img src={downloadCSVIcon} alt='' className='small-icon'/>
                                    </button>
                                </div>
                                <div class="alert alert-info padding-5">
                                    Scanned <strong>{this.state.linkLinks.length + this.state.imageLinks.length} links </strong> in <strong>{this.state.latestResponseTime} seconds!!</strong>
                                    
                                </div>
                            </div>
                        ): ''}
                            
                            {this.state.linkLinks.length > 0 && (
                                <CollapsiblePanel header='Links' linkList={this.state.linkLinks} content='links' />)}
                            
                            {this.state.imageLinks.length > 0 && (
                            <CollapsiblePanel header='Images' linkList={this.state.imageLinks} content='images' />)}

                            {/* <CollapsiblePanel header='WebsiteTree' linkList={this.state.linkLinks.concat(this.state.imageLinks)} content='tree' /> */}
                        </div>
                    )}
            </div>
        );
        }
    }

export default PageComponent;
