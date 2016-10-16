import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import * as HeroesActions from '../../actions/HeroesActions';
import Hero from '../../components/heroes/parts/Hero'


const mapStateToProps = (state) => {
  return {
    heores: state.heroes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(HeroesActions.heroesLoadStart());
    }
  };
};

class HeoresList extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    let click = function(){console.log(this);};
    const data = this.props.heores;
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

        return (
          <Hero key={index} itemKey={itemKey} itemContent={itemContent} click={click}/>
        );
      });
    }
    const style={
      padding: '7.5px'
    }
    return (
      <div className="col-xs-12" style={style}>
        {listHeores}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeoresList);
