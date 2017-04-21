import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import * as HeroesActions from '../../actions/HeroesActions';
import Hero from '../../components/heroes/parts/Hero';
import HeroAdd from '../../components/heroes/parts/HeroAdd';


const mapStateToProps = (state) => {
  return {
    heroes: state.heroes
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
    const data = Object.assign({},this.props.heroes);
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      dataArray.unshift({ItemKey: key, ItemContent: data[key]});
    }); 
    let listHeores = "";
    if (dataArray.length > 0) {
      listHeores = dataArray.map((hero, index) => {

        const itemKey = hero.ItemKey;
        const itemContent = Object.assign({},hero.ItemContent);

        if (!hero.ItemContent.delete) {
          return (
            <Hero key={index} itemKey={itemKey} itemContent={itemContent} showFlag={true} itemSize="col-sm-4 col-lg-3"/>
          );
        }
      });
    }
    const style = {
      padding: '7.5px'
    };
    return (
      <div className="col-xs-12" style={style}>
        {listHeores}
        <HeroAdd/>
      </div>
    );
  }
}

HeoresList.propTypes = {
  onMount: PropTypes.func.isRequired,
  heroes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeoresList);
