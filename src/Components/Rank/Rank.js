import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headers from "../../assets/logo/headers.png"
import {Footer} from '../_Footer/Footer';
import TeamCard from './TeamCard';
import './Rank.css';

class Rank extends Component {

  constructor(){
    super();
    this.state={
      deadUser: '',
      ranks: []
    }
  }

  componentDidMount(){
    this.onPress();
  }

  onPress = () =>{
    let error = false;
    fetch('/api/score')
    .then(response => {
      if(response.status!==200)
        error = true;
      return response.json();
    })
    .then((scores) => {
      if(error)
        throw(scores);
      this.setState({ranks: scores});
    })
    .catch(console.log);
  }

  render() {
    const Leaderboard = ({ranks}) => {
      const teamComponent = ranks.map((member, i) =>
          <TeamCard 
            key={i}
            serial={parseInt(i)+1}
            mid={member.ifid}
            mname={member.name}
            college={member.college}
            qid={member.qid}
          />
      );
      return (
        <div className='white flex flex-column items-center mh4-ns mh1 tableInf'>
          <table className="f4 w-100" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Rank</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Name</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">IF-ID</th>
                <th className="fw6-ns fw8 bb b--white-20 tc pb3 pr3">Level</th>
              </tr>
            </thead>
            <tbody className="lh-copy" id='leader-body'>
              {teamComponent}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <div>
          <a href='https://www.infotsav.in' target="_blank" rel="noopener noreferrer"><img src={headers} className="headim" alt="infotsav logo" /></a>
        </div>
        <Leaderboard ranks={this.state.ranks} />
        <Footer />
      </div>
    );
  }
}

export default Rank;
