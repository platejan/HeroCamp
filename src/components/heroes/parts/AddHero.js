import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addHero} from '../../../actions/HeroesActions';
import toastr from 'toastr';
import AddHeroForm from './AddHeroForm';

export class AddHero extends React.Component {
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
    if (this.state.hero.name != "") {
      this.props.actions.addHero(this.state.hero, (error = null)=> {
        if (error == null) {
          toastr.success("Your Hero was added");
          let hero = this.state.hero;
          hero["name"] = "";
          hero["description"] = "";
          this.setState({hero: hero});
        } else {
          toastr.error("Cannot add your Hero.");
        }
      });
    }else{
      toastr.error("Hero should has name.");
    }
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

AddHero.propTypes = {
  actions: PropTypes.object.isRequired,
  ownerID: PropTypes.string.isRequired
};

AddHero.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddHero);
