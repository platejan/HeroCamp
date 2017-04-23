import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadLibrary, createItem, deleteItem} from './../../actions/LibraryActions';
import toastr from 'toastr';
import CreateLibraryItem from './parts/CreateLibraryItem';
import {Modal} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


class LibraryPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddStory: false
    };
    this.createItem = this.createItem.bind(this);
    this.toggleAddStory = this.toggleAddStory.bind(this);
  }

  componentWillMount() {
    this.props.beforeMount();
  }

  toggleAddStory() {
    this.setState(Object.assign({}, this.state, {showAddStory: !this.state.showAddStory}));
  }

  createItem(item) {
    this.props.actions.createItem(item, (error = null)=> {
      if (error == null) {
        toastr.success("Story send");
      } else {
        toastr.error(error);
      }
    });
    this.toggleAddStory();
  }

  render() {
    if (this.props.children) {
      return (
        <div>{this.props.children}</div>
      )
    } else {

      const data = this.props.library;
      let dataArray = [];
      let libraryItems = "";
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          dataArray.unshift({ItemKey: key, ItemContent: data[key]});
        });
        if (dataArray.length > 0) {
          libraryItems = dataArray.map((item, index) => {

            const itemKey = item.ItemKey;
            const itemContent = item.ItemContent;
            const itemIndex = index + itemKey;

            if (!itemContent.delete) {
              let linkTo = "/library/" + itemKey;
              return (
                <LinkContainer key={itemIndex}to={linkTo}>
                  <div className="story-part col-xs-12 col-lg-6">
                    <div className="">
                      <div className="story-part-icon-part">
                      </div>
                      <div className="story-part-info">
                        <span className="info-label">Name:</span>
                        <span className="">{itemContent.name}</span>
                        <span className="info-label">Owner:</span>
                        <span
                          className="">{this.props.usernames[itemContent.autor] ? this.props.usernames[itemContent.autor].name : itemContent.autor}</span>
                      </div>
                    </div>
                  </div>
                </LinkContainer>
              );
            }
          });
        }
      }

      return (
        <div className="col-xs-12">
          <button onClick={this.toggleAddStory} className="btn btn-primary">
            <span className="glyphicon glyphicon-plus"></span>
            Add story
          </button>
          <Modal show={this.state.showAddStory} onHide={this.toggleAddStory}>
            <Modal.Header closeButton>
              <Modal.Title>Add story</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginTop:"0",marginBottom:"0"}}>
              <div className="row">
                <div className="col-xs-12">
                  <CreateLibraryItem create={this.createItem}/>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div className="row" style={{padding:"7.5px"}}>
            {libraryItems}
          </div>
        </div>
      );
    }
  }
}
LibraryPage.propTypes = {};

LibraryPage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    library: state.library,
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    beforeMount: () => {
      dispatch(loadLibrary());
    },
    actions: bindActionCreators({createItem, deleteItem}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryPage);
