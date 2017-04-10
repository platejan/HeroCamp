import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import toastr from 'toastr';
import * as HeroesActions from '../../../actions/HeroesActions';
import {setHero} from '../../../actions/HeroesActions';
import {CurrentStoryClear} from '../../../actions/StoriesActions';
import Hero from '../../../components/heroes/parts/Hero';
import {Modal} from 'react-bootstrap';


class SwitchHero extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };
    this.setHero = this.setHero.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    if (Object.keys(this.props.heroes).length < 1)
      this.props.onMount(this.props.storyKey);

  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {showModal: nextProps.show}))
  }

  setHero(heroKey) {
    this.props.actions.setHero(heroKey, (error = null)=> {
      if (error == null) {
        toastr.success("ok");
      } else {
        toastr.error(error);
      }
    });
    this.close();
  }

  close() {
    this.setState(Object.assign({}, this.state, {showModal: false}))
    this.props.closeSwitch();
  }

  render() {
    const data = this.props.heroes;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let listHeores = "";
    if (dataArray.length > 0) {
      listHeores = dataArray.map((hero, index) => {

        const itemKey = hero.ItemKey;
        const itemContent = hero.ItemContent;
        const itemIndex = index + itemKey;

        if (itemContent.owner == this.props.userID) {
          return (
            <Hero key={itemIndex} itemKey={itemKey} onClicAction={this.setHero.bind(this,itemKey)}
                  itemContent={itemContent} itemSize="col-sm-6 col-lg-4"/>
          );
        }
        return;
      });
    }
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Switch hero</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
                {listHeores}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SwitchHero.propTypes = {
  userID: PropTypes.string.isRequired
};

SwitchHero.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    userID: state.auth.currentUserUID,
    heroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (storyKey) => {
      dispatch(HeroesActions.LoadStoryHeroes(storyKey));
    },
    actions: bindActionCreators({setHero}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchHero);
