import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItems from './NewsItems';
import Spinner from './Spinner';

export default class News extends Component {

    static defaultProps ={
        country:"in",
        pageSize:10,
        category:"general"
    }

    static propTypes ={
        country:PropTypes.string.isRequired,
        pageSize:PropTypes.number.isRequired,
        category:PropTypes.string.isRequired
    }



   articles =[
    // {
            

    //         {
    //             "source": {
    //                 "id": "techcrunch",
    //                 "name": "TechCrunch"
    //             },
    //             "author": "Jon Fingas",
    //             "title": "SEC opens investigation into Elon Musk over possible insider trading",
    //             "description": "Elon Musk isn't getting a break from the SEC any time soon. WSJ reports the SEC is investigating whether Musk and his brother Kimbal violated insider trading regulations with recent share sales.",
    //             "url": "https://techcrunch.com/2022/02/24/sec-opens-investigation-into-elon-musk-over-possible-insider-trading/",
    //             "urlToImage": "https://techcrunch.com/wp-content/uploads/2020/02/GettyImages-1175368064.jpg?w=600",
    //             "publishedAt": "2022-02-24T23:01:42Z",
    //             "content": "More posts by this contributor\r\nElon Musk isn’t about to catch a hoped-for break from the SEC any time soon. Sources for The Wall Street Journalclaim the SEC is investigating whether Musk and his bro… [+1806 chars]"
    //         }
        ];
    
        constructor(props){
            super()
            console.log("im contructor");
            this.state ={
                articles:[],
                loading:false,
                page:1,
                totalResults:0,
               
            };
            document.title=`DailyHunk - ${props.category}`
        }
        
       async componentDidMount(){
           this.props.setProgress(10);
           console.log("i am mouted");
           let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=1&pageSize=${this.props.pageSize}`

           {this.setState({
               loading:true
           })}
           let data=await fetch(url);
           this.props.setProgress(30);
           let parsedData= await data.json();
           this.props.setProgress(50);
           console.log(parsedData);
           this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false,
           
        
        
        });
        this.props.setProgress(100);
       }

    handlePrev = async () =>{
        this.props.setProgress(10);
        {this.setState({
            loading:true
        })}
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);


        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
        loading:false}
            )
            this.props.setProgress(100);

        
        
    }

    handleNext = async () =>{
        this.props.setProgress(10);

        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0b462f7386c470dbdb7868161206cdb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        {this.setState({
            loading:true
        })}
        let data=await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
            
        })
        this.props.setProgress(100);

        
        
    }



  
  render() {
    return (
     <>
    {this.state.loading &&  <Spinner />}
     <h1 className='text-center text-success'>Live News</h1>
<div className="container mt-3">

    <div className="row">

        {this.state.articles.map((element)=>{
            return(

                <div className="col-md-4" key={element.url}>

                    <NewsItems 
                    title={element.title}
                    description={element.description}
                    url={element.urlToImage}
                    linkUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />

                </div>
            )

        })}
    </div>

    <div className="container d-flex justify-content-between">

    <button
              className="btn btn-dark"
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrev}
            >
              &laquo; Prev
            </button>

            <button className="btn btn-dark" onClick={this.handleNext} disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}>
              Next &raquo;
            </button>
    </div>
    <br />



</div>


     
     </>
    )
  }
}
