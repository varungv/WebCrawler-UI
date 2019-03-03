import React, { Component } from 'react';
import arrow from './arrow.svg';
import linkIcon from './icons/link.png';
import WebSiteTreeBuilder from './WebSiteTreeBuilder';

class CollapsiblePanel extends Component {
  render() {
    var {header, linkList, content} = this.props;
    var li_list = [];
    var count = linkList.length;
    var li = '';
    if(content === 'links'){
        for(var i=0; i<linkList.length; i++){
            li = (
                <li>
                    <a href={linkList[i]} target='_blank'>
                        <img src={linkIcon} alt='' className='xs-icon'/>
                        {linkList[i]}
                    </a>
                </li>);
            li_list.push(li);
        }
    }else if(content === 'images'){
        for(var i=0; i<linkList.length; i++){
            li = (
            <a href={linkList[i]} target='_blank'>
                <img src={linkList[i]} title={linkList[i]} alt='' className='max-display-img' />
            </a>
            );
            li_list.push(li);
        }
    }

    return (
        <div className="panel-group">
            <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                <a data-toggle="collapse" href={"#" + header + "collapse1"} className='display-block fit-container padding-5'>
                    <img src={arrow} title='expand' className='xs-icon'/>
                    {header}
                    <button className='btn btn-warning margin-left-10'>{count}</button>
                </a>
                </h4>
            </div>
            <div id={header + "collapse1"} className="panel-collapse collapse">
                {this.props.content === 'tree' ? (
                    <WebSiteTreeBuilder url_list={linkList} json={{}}></WebSiteTreeBuilder>
                ):
                <ul className='color-black list-style-none'>
                    {li_list}
                </ul>
            }
            </div>
            </div>
        </div>
    );
  }
}

export default CollapsiblePanel;
