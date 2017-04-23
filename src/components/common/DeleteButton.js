import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';

class DeleteButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {showModal: false};
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    this.setState({showModal: !this.state.showModal});
    if (e)
      e.stopPropagation();
  }

  render() {
    return (
      <button
        className={this.props.className?this.props.className:""}
        style={this.props.style? this.props.style: {}}
        onClick={this.toggleModal}>
        {this.props.glyphicon ? (
          <span className={"glyphicon glyphicon-"+this.props.glyphicon+" "+(this.props.text?"":"noText")}></span>
        ) : ""}
        {this.props.text ? this.props.text : ""}
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Body>
            Are you sure?
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.toggleModal} className="btn btn-success">I'm not.</button>
            <button onClick={this.props.click} className="btn btn-danger"><span className="glyphicon glyphicon-trash" /> Yes, I am. Delete it.</button>
          </Modal.Footer>
        </Modal>
      </button>
    );
  }
}
DeleteButton.propTypes = {};

DeleteButton.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
