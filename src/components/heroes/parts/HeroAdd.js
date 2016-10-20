import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addHero} from '../../../actions/HeroesActions';
import toastr from 'toastr';

export class HeroAdd extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hero: {
        public: {
          icon: "ikonka.jpg",
          name: "Unknown",
          age: "0",
          species: "Human",
          biography: "Born, Life, Death",
          behavior: "Alive",
          inventory: "Empty"
        },
        private: {
          icon: "ikonka.jpg",
          name: "Unknown",
          age: "0",
          species: "Human",
          biography: "Born, Life, Death",
          behavior: "Alive",
          inventory: "Empty"
        },
        hasChange: false,
        owner: this.props.ownerID,
        inGame: false
      },
      heroKey: this.props.itemKey,
      editWindowState: false
    };

    this.addHero = this.addHero.bind(this);
  }

  addHero() {
    this.props.actions.addHero(this.state.hero, (error = null)=> {
      if (error == null) {
        toastr.success("New Hero was added");
      } else {
        toastr.error("Cannot add your Hero.");
      }
    });
  }

  render() {

    return (
      <div onClick={this.addHero} className="hero-part col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="col-xs-12">
          <div className="create-hero-part">
            <span className="glyphicon glyphicon-plus"></span>
            <span>Create hero</span>
          </div>
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(HeroAdd);
