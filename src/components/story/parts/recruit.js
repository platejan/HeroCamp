import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {recruitHero,rejectRecruitHero} from '../../../actions/HeroesActions';
import Hero from '../../../components/heroes/parts/Hero';


class Recruit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
    this.recruitHero = this.recruitHero.bind(this);
  }

  componentDidMount(){
    this.props.onMount();
  }

  recruitHero(heroKey){
    this.props.actions.recruitHero(heroKey,this.props.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }

  rejectHero(heroKey){
    this.props.actions.rejectRecruitHero(heroKey,this.props.userID,this.props.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }
  render() {
    const data = this.props.heroes;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listHeores = "";
    if (dataArray.length > 0) {
      listHeores = dataArray.map((hero,index) => {

        const itemKey = hero.ItemKey;
        const itemContent = hero.ItemContent;

        if(!itemContent.delete && (!itemContent.inGame || itemContent.recruit==this.props.storyKey)) {
          return (
            <Hero key={index} onClicAction={!itemContent.recruit?()=>{this.recruitHero(itemKey);}:()=>{this.rejectHero(itemKey);}} itemKey={itemKey}
                  itemContent={itemContent} showFlag={true} itemSize="col-sm-6 col-lg-4"/>
          );
        }
      });
    }
    return (
      <div className="col-xs-12">
        <h1>Recruit</h1>
        {listHeores}
      </div>
    );
  }
}

Recruit.propTypes = {
  userID: PropTypes.string.isRequired
};

Recruit.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => {
      dispatch(HeroesActions.heroesLoadStart());
    },
    actions: bindActionCreators({recruitHero,rejectRecruitHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recruit);
