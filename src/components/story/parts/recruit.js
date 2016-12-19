import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {recruitHero} from '../../../actions/HeroesActions';
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
    console.log(heroKey);
    this.props.actions.recruitHero(heroKey,this.props.storyKey, (error = null)=> {
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
            <Hero key={index} onClicAction={this.recruitHero.bind(this,itemKey)} itemKey={itemKey}
                  itemContent={itemContent}/>
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
    actions: bindActionCreators({recruitHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recruit);
