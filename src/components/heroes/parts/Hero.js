import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UpdateHeroForm from './UpdateHeroForm';
import {updateHero} from '../../../actions/HeroesActions';
import toastr from 'toastr';

export class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hero: {
        name: this.props.heroName,
        owner: this.props.ownerID,
        description: this.props.heroDescription,
        inventory: this.props.heroInventory
      },
      heroKey: this.props.heroKey
    };

    this.updateHeroState = this.updateHeroState.bind(this);
    this.updateHero = this.updateHero.bind(this);
    this.click = this.click.bind(this);
  }

  updateHero(event) {
    event.preventDefault();
    if (this.state.hero.name != "") {
      console.log("Update hero:");
      console.log(this.state.hero);
      // @TODO update hero issue 7
      this.props.actions.updateHero(this.state.hero, this.state.heroKey,(error = null)=> {
        if (error == null) {
          toastr.success("Your Hero was updated");
        } else {
          toastr.error("Cannot update your Hero.");
        }
      });
    }
  }

  updateHeroState(event) {
    const field = event.target.name;
    let state = this.state;
    state.hero[field] = event.target.value;
    return this.setState(state);
  }

  click(){
    const dataTarget = "#"+"hero-update-form-" + this.state.heroKey;
    document.querySelector(dataTarget).classList.toggle('in');
  }

  render() {
    const id = "hero-update-form-" + this.state.heroKey;
    const dataTarget = "#"+id;
    return (
      <div>
        <button data-toggle="collapse" data-target={dataTarget} onClick={this.click}>{this.state.hero.name}</button>
        <UpdateHeroForm
          onChange={this.updateHeroState}
          onSave={this.updateHero}
          hero={this.state.hero}
          id={id}
        />
      </div>
    );
  }
}

Hero.propTypes = {
  //actions: PropTypes.object.isRequired,
  ownerID: PropTypes.string.isRequired,
  heroKey: PropTypes.string.isRequired,
  heroName: PropTypes.string.isRequired,
  heroDescription: PropTypes.string.isRequired,
  heroInventory: PropTypes.object.isRequired
};

Hero.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({updateHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hero);
