import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';
import {addChapter, loadChapters, switchChapter, deleteChapter} from '../../../actions/ChaptersActions';
import {loadPosts} from '../../../actions/PostsActions';
import DeleteButton from './../../common/DeleteButton';


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
    this.deleteChapter = this.deleteChapter.bind(this);
  }

  switch(key) {
    this.props.actions.loadPosts(key);
    this.props.actions.switchChapter(key);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.newChapter[field] = event.target.value;
    return this.setState(state);
  }

  deleteChapter(chapterKey) {
    if (this.props.storyOwner == this.props.currentUID) {
      this.props.actions.deleteChapter(this.state.storyKey, chapterKey, (error = null)=> {
        if (error == null) {
          toastr.success("deleted");
        } else {
          toastr.error(error);
        }
      });
    }
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
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
    }
    let buttonsChapters = "";
    if (dataArray.length > 0) {
      buttonsChapters = dataArray.map((chapter, index) => {

        const itemKey = chapter.ItemKey;
        const itemContent = chapter.ItemContent;
        const deleteKey = "delete" + itemKey;
        const chapterKey = "chapter" + itemKey;
        let trash = "";
        if (!chapter.ItemContent.delete) {
          if (this.props.storyOwner == this.props.currentUID) {
            trash = (
              <DeleteButton key={deleteKey} click={()=>{this.deleteChapter(itemKey);}} glyphicon="trash" className="btn btn-danger col-xs-2" />);
          }
          return (
            <div className="row marginTop15" key={chapterKey}>
              <div className="col-xs-12 btn-group">
                <button onClick={this.switch.bind(this,itemKey)} key={itemKey} type="button"
                        className="btn btn-success col-xs-10">
                  {itemContent.name}
                </button>
                {trash}
              </div>
            </div>
          );
        }
      });
    }

    let createForm = "";

    if (this.props.storyOwner == this.props.currentUID) {
      createForm = (
        <div className="row panel">
          <div className="panel-body">
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
          </div>
        </div>
      );
    }

    return (
      <div>
        {buttonsChapters}
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
    actions: bindActionCreators({addChapter, switchChapter, loadPosts, deleteChapter}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterToolbar);
