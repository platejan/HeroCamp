import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import checkAuth from '../../requireAuth';
import TextInput from '../../common/TextInput';
import toastr from 'toastr';
import {addChapter, loadChapters} from '../../../actions/ChaptersActions';


class ChapterToolbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newChapter:{
        name: ""
      },
      storyKey: this.props.storyKey
    };

    this.onchange = this.onchange.bind(this);
    this.createChapter = this.createChapter.bind(this);
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    state.newChapter[field] = event.target.value;
    return this.setState(state);
  }

  createChapter(){
    if(this.state.newChapter.name!=""){
      this.props.actions.addChapter(this.state.storyKey,this.state.newChapter, (error = null)=> {
        if (error == null) {
          toastr.success("chapter added", {timeOut: 250});
        } else {
          toastr.error(error);
        }
      });
    }else{
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
      buttonsChapters = dataArray.map((chapter,index) => {

        const itemKey = chapter.ItemKey;
        const itemContent = chapter.ItemContent;
        return (
          <button onClick={this.props.switch.bind(this,itemKey)} key={itemKey} type="button" className="btn btn-success">
            {itemContent.name}
          </button>
        );
      });
    }
    return (
    <div className="col-xs-12 col-sm-2 col-lg-1">
      {buttonsChapters}
      <br/>
      <TextInput
        name="name"
        label="Name"
        onChange={this.onchange}
        value={this.state.newChapter.name}
      />
      <button type="button" onClick={this.createChapter} className="btn btn-primary"><span className="glyphicon glyphicon-plus"></span>Create
        chapter
      </button>
    </div>
    );
  }
}

ChapterToolbar.propTypes = {
  ownerID: PropTypes.string.isRequired
};

ChapterToolbar.contextTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    ownerID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addChapter}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChapterToolbar);
