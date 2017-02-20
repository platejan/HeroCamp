import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {switchRulesSet,deleteRulesSet} from '../../../actions/rulesActions';

class RulesToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };


    this.switch = this.switch.bind(this);
    this.delete = this.delete.bind(this);
  }

  switch(key) {
    this.props.actions.switchRulesSet(key);
  }
  delete(key) {
    if (this.props.rules.rulesSets[key].autor == this.props.currentUID) {
      this.props.actions.deleteRulesSet(key, (error = null)=> {
        if (error == null) {
          toastr.success("deleted");
        } else {
          toastr.error(error);
        }
      });
    }
  }

  render() {
    const data = this.props.rules.rulesSets;
    let dataArray = [];
    if(data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
    }
    let buttons = "";
    if (dataArray.length > 0) {
      buttons = dataArray.map((Item, index) => {

        const itemKey = Item.ItemKey;
        const itemContent = Item.ItemContent;
        const deleteKey = "delete"+itemKey;
        const switchKey = "switch"+itemKey;
        let trash = "";
        if(!Item.ItemContent.delete){
          if (Item.ItemContent.autor == this.props.currentUID) {
            trash = (
              <button className="btn btn-danger col-xs-2" key={deleteKey} onClick={this.delete.bind(this,itemKey)}>
                <span className="glyphicon glyphicon-trash noText"></span>
              </button>);
          }
          return (
            <div className="row marginTop15" key={switchKey}>
              <div className="col-xs-12 btn-group">
              <button onClick={this.switch.bind(this,itemKey)} type="button"
                      className="btn btn-success col-xs-10">
                {itemContent.nameOfRulesSet}
              </button>
              {trash}
                </div>
            </div>
          );
        }
      });
    }

    return(
      <div>{buttons}</div>
    );
  }
}
RulesToolbar.propTypes = {};

RulesToolbar.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({switchRulesSet,deleteRulesSet}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RulesToolbar);
