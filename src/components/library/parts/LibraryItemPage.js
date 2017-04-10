import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteItem} from './../../../actions/LibraryActions';
import {redirectMe} from './../../../actions/redirectAction';
import toastr from 'toastr';
import ReactMarkdown from 'react-markdown';


class LibraryItemPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: props.params.itemId
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
  }

  deleteItem() {
    this.props.actions.deleteItem(this.state.id, (error = null)=> {
      if (error == null) {
        toastr.success("Story delete");
        this.props.actions.redirectMe("/library");
      } else {
        toastr.error(error);
      }
    });
  }

  render() {
    if (this.props.library && this.state.id && this.props.library[this.state.id]) {
      let content = this.props.library[this.state.id];
      let autor = this.props.usernames[content.autor] ? this.props.usernames[content.autor].name : content.autor;
      let deleteButton = (<button onClick={this.deleteItem} className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span> remove story</button> )
      return (
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12 col-lg-4 col-lg-push-8">
              <h1>{content.name}</h1>
              <dl>
                <dt>autor</dt>
                <dd>{autor}</dd>
              </dl>
              {deleteButton}
            </div>
            <div className="col-xs-12 col-lg-8 col-lg-pull-4">
              <ReactMarkdown className="panel panel-default panel-body" source={content.text} softBreak="br"/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-xs-12">
          Loading library...
        </div>
      );
    }
  }
}
LibraryItemPage.propTypes = {};

LibraryItemPage.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    library: state.library,
    usernames: state.usernames
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({deleteItem,redirectMe}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryItemPage);
