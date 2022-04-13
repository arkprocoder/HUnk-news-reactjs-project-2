import React, { Component } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';



export default class App extends Component {

   state={
     progress:0
   }
   setProgress = (progress)=>{
     this.setState({progress:progress})
   }

  render() {
    return (
      <>
      <Router>

     <Navbar />
     <LoadingBar
     color='red'
     height="5px"
     progress={this.state.progress}
     
     />

 <Routes>
   
   <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="in" />} /> 
   
   <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" category="business" pageSize={5} country="in" />} /> 
   
   <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} category="entertainment" country="in" />} /> 
   
   <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={5} country="in" category="general" />} /> 
   
   <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} country="in" category="health"/>} /> 
   
   <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} country="in" category="science"/>} /> 
   
   <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} country="in" category="sports"/>} /> 
   
   <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={5} category="technology" country="in" />} /> 




   
   </Routes> 

      </Router>
      
      
      
      </>
    )
  }
}

