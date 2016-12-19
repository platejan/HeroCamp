import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {acceptRecruitHero} from '../../../actions/HeroesActions';
import Hero from '../../../components/heroes/parts/Hero';


class AcceptRecruit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
    this.acceptRecruitHero = this.acceptRecruitHero.bind(this);
  }

  componentDidMount(){
    this.props.onMount();
  }

  aceptRecruitHero(heroKey){
    console.log(heroKey);
    this.props.actions.acceptRecruitHero(heroKey,this.props.storyKey, (error = null)=> {
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

        if(!itemContent.ingame) {
          return (
            <Hero key={index} onClicAction={this.acceptRecruitHero.bind(this,itemKey)} itemKey={itemKey}
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
    heroes: state.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => {
      dispatch(HeroesActions.LoadPotentialRecruits());
    },
    actions: bindActionCreators({acceptRecruitHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptRecruit);
