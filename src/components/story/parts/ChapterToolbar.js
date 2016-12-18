import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';
import {addChapter, loadChapters, switchChapter} from '../../../actions/ChaptersActions';


class ChapterToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newChapter: {
        name: ""
      },
      storyKey: this.props.storyKey
    };

    this.onchange = this.onchange.bind(this);
    this.switch = this.switch.bind(this);
    this.createChapter = this.createChapter.bind(this);
  }

  switch(key) {
    this.props.actions.switchChapter(key);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.newChapter[field] = event.target.value;
    return this.setState(state);
  }

  createChapter() {
    if (this.state.newChapter.name != "") {
      this.props.actions.addChapter(this.state.storyKey, this.state.newChapter, (error = null)=> {
        if (error == null) {
          toastr.success("chapter added", {timeOut: 250});
        } else {
          toastr.error(error);
        }
      });
    } else {
      toastr.error("Chapter must have a name.");
    }
  }


  componentDidMount() {
  }

  render() {
    const data = this.props.chapters;
    let dataArray = [];
    Object.keys(data).forEach(function (key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object
      dataArray.push({ItemKey: key, ItemContent: data[key]});
    });
    let buttonsChapters = "";
    if (dataArray.length > 0) {
      buttonsChapters = dataArray.map((chapter, index) => {

        const itemKey = chapter.ItemKey;
        const itemContent = chapter.ItemContent;
        return (
          <button onClick={this.switch.bind(this,itemKey)} key={itemKey} type="button"
                  className="btn btn-success col-xs-12">
            {itemContent.name}
          </button>
        );
      });
    }

    let createForm = "";

    if (this.props.storyOwner == this.props.currentUID) {
      createForm = (
        <form>
          <TextInput
            name="name"
            label="Name"
            onChange={this.onchange}
            value={this.state.newChapter.name}
          />
          < button
            type="button"
            onClick={this.createChapter}
            className="btn btn-primary col-xs-12">
            <span className="glyphicon glyphicon-plus"> </span> Create chapter
          </button>
        </form>
      );
    }

    return (
      <div className="col-xs-12 col-sm-3 col-lg-2">
        {buttonsChapters}
        <br/>
        {createForm}
      </div>
    );
  }
}

ChapterToolbar.propTypes = {
  currentUID: PropTypes.string.isRequired
};

ChapterToolbar.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addChapter, switchChapter}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterToolbar);
