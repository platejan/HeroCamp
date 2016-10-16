import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateHero} from '../../../actions/HeroesActions';
import Overlay from '../../common/Overlay';
import HeroEdit from './HeroEdit';

export class Hero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hero: {
        public:{
          name: this.props.itemContent.name
        },
        private:{
          name: this.props.itemContent.name
        },
        hasChange:false
        //owner: this.props.itemContent.ownerID
        //description: this.props.heroDescription,
        //inventory: this.props.heroInventory
      },
      heroKey: this.props.itemKey,
      editWindowState: false
    };
    this.showEditWindow = this.showEditWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
  }

  showEditWindow(){
    let newState = this.state;
    newState.editWindowState = true;
    this.setState(newState);
  }
  hideEditWindow(){
    let newState = this.state;
    newState.editWindowState = false;
    this.setState(newState);
  }

  render() {
    let HeroEdit = <p>swda</p>;
    return (
      <div className="hero-part col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="col-xs-12">
          <div className="hero-bio-icon-part">
          </div>
          <div className="hero-bio-part">
            <span className="info-label">Name:</span>
            <span className="">{this.state.hero.public.name}</span>
            <span className="info-label">Species:</span>
            <span className="">--</span>
            <span className="info-label">Age:</span>
            <span className="">--</span>
          </div>
          <div className="hero-bio-flag-part">
            <span>in game</span>
          </div>
          <div className="hero-bio-tools-part">
            <span onClick={this.showEditWindow} className="glyphicon glyphicon-pencil"></span>
          </div>
          <Overlay click={this.hideEditWindow} child={HeroEdit} display={this.state.editWindowState}/>
        </div>

      </div>
    );
  }
}

Hero.propTypes = {
  itemContent: PropTypes.object.isRequired,
  itemKey: PropTypes.string.isRequired
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
