import React, { Component } from 'react';

class WebSiteTreeBuilder extends Component {
    constructor(props){
        super(props);
        for(var i=0; i<props.url_list.length; i++){
            var url = props.url_list[i];
            var split_url = url.split('/');
            console.log(this.convert_to_json(split_url));
        }
    }
    convert_to_json = (split_url) =>{
        var json = {};
        for(var i=0; i<split_url.length; i++){
            
        }
        return json;
    }
    render() {
        return (
            <div>
                hellos
            </div>
        );
    }
}

export default WebSiteTreeBuilder;
