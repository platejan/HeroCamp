import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addHero} from '../../actions/HeroesActions';
import toastr from 'toastr';
import AddHeroForm from './parts/AddHeroForm'

export class HeroesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hero: {
        name: "",
        owner: this.props.ownerID,
        description: "",
        inventory: {}
      }
    };

    this.updateHeroState = this.updateHeroState.bind(this);
    this.addHero = this.addHero.bind(this);
  }

  addHero(event) {
    event.preventDefault();

    this.props.actions.addHero(this.state.hero, (error = null)=> {
      if(error == null){
        toastr.success("Added");
      }else{
        toastr.error("Cannot add your Hero.")
      }
        });
  }

  updateHeroState(event) {
    const field = event.target.name;
    let hero = this.state.hero;
    hero[field] = event.target.value;
    return this.setState({hero: hero});
  }

  render() {
    return (
      <AddHeroForm
        onChange={this.updateHeroState}
        onSave={this.addHero}
        hero={this.state.hero}
      />
    );
  }
}

HeroesPage.propTypes = {
  actions: PropTypes.object.isRequired
};

HeroesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesPage);
