import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {acceptRecruitHero,rejectRecruitHero} from '../../../actions/HeroesActions';
import {CurrentStoryClear} from '../../../actions/StoriesActions';
import Hero from '../../../components/heroes/parts/Hero';


class AcceptRecruit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
    this.acceptRecruitHero = this.acceptRecruitHero.bind(this);
  }

  componentDidMount(){
    this.props.onMount(this.props.storyKey);
  }

  componentWillUnmount(){
    this.props.actions.CurrentStoryClear();
  }

  acceptRecruitHero(heroKey){
    console.log(heroKey);
    this.props.actions.acceptRecruitHero(heroKey,this.props.potentialHeroes[heroKey].owner,this.props.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }

  rejectRecruitHero(heroKey){
    this.props.actions.rejectRecruitHero(heroKey,this.props.potentialHeroes[heroKey].owner,this.props.storyKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
  }

  render() {
    const data = this.props.potentialHeroes;
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

        if(!itemContent.inGame) {
          return (
            <Hero key={index} accept={this.acceptRecruitHero.bind(this,itemKey)} reject={this.rejectRecruitHero.bind(this,itemKey)} itemKey={itemKey}
                  itemContent={itemContent}/>
          );
        }
      });
    }
    return (
      <div className="col-xs-12">
        <h1>Accept Recruit</h1>
        {listHeores}
      </div>
    );
  }
}

AcceptRecruit.propTypes = {
  userID: PropTypes.string.isRequired
};

AcceptRecruit.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    potentialHeroes: state.currentStory.potentialRecruits
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (storyKey) => {
      dispatch(HeroesActions.LoadPotentialRecruits(storyKey));
    },
    actions: bindActionCreators({acceptRecruitHero,rejectRecruitHero,CurrentStoryClear}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptRecruit);
