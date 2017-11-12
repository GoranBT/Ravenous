import React from 'react';
import './SearchBar.css';


const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};



class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.handleSortByChange = this.handleSortByChange.bind(this);

  }

  getSortByClass(sortByOption){
    this.state.sortBy === sortByOption ? 'active' : '';

  }

  handleSortByChange(sortByOption){
    this.setState({ sortBy: sortByOption }, () => console.log(this.state));
  }

  renderSortByOptions(){
    return Object.keys(sortByOptions).map(sortByOption => {
      const sortByOptionValue = sortByOptions[sortByOption];
      return <li key={sortByOptionValue} onClick={this.handleSortByChange}>{sortByOption}</li>;
    });
  }
  render(){
    return(<div className="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOptions()}
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" />
        <input placeholder="Where?" />
      </div>
      <div className="SearchBar-submit">
        <a>Lets Go</a>
      </div>
    </div>);
  }
}

export default SearchBar;
