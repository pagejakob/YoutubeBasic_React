//Get React & ReactDom from node_modules
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
//API Key
const API_KEY = 'AIzaSyC2EPyOEGCBo-HnbJplhc0n6uhNXnprhzA';

// Create a new component. Should produce some HTML 
//ES6: const = var - This is the final const and won't ever change.
// The <div></div> is JSX not HTML. 
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [],
            selectedVideo: null

        };

        this.videoSearch('');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            //this.setState({videos: videos});
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            
            });  
        });
    }


    //using div it creates a React.createElement and not ReactDom
    render(){

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
        <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                videos={this.state.videos} />
        </div>
        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
//change <App> to <App />
ReactDOM.render(<App />, document.querySelector('.container'));