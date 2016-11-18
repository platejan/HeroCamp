import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';
import Textarea from 'react-textarea-autosize';

class StoryEdit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showBiography: true,
      showBehavior: false,
      showInventory: false
    };
    this.showTab = this.showTab.bind(this);
    this.activeTabAnchor = this.activeTabAnchor.bind(this);
    this.activeTab = this.activeTab.bind(this);
  }

  showTab(event) {
    let state = this.state;
    state.showBiography = false;
    state.showBehavior = false;
    state.showInventory = false;
    state[event.target.name] = true;
    this.setState(state);
  }

  activeTabAnchor(name) {
    if (this.state[name])return "active"; else return "";
  }

  activeTab(name) {
    if (this.state[name])return {display: 'block'}; else return {display: 'none'};
  }

  render() {
    let stop = function (e) {
      e.stopPropagation();
    };

    let className;
    if (this.props.display) {
      className = "hero-detail-part overlay-section-part";
    } else {
      className = "hero-detail-part overlay-section-part dont-show";
    }

    let information;
    if (this.props.story.hasChange) {
      information = (
        <div className="change-block">
          <span>You update some information. After finish publish changes to world.</span> <a
          onClick={this.props.reject}>Delete draft</a> <a
          onClick={this.props.publish}>Publish</a>
        </div>
      );
    } else {
      information = "";
    }

    const styleHelp = {maxWidth: '260px'};

    return (
      <div onClick={this.props.click} className={className}>
        <div className="col-xs-12 clickable">
          <div onClick={stop}
               className="hero-detail-form-part col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-push-1 col-md-push-2 col-lg-push-3">
            <div className="header-block">
              <Icon icon={this.props.story.private.icon}/>
              <div className="edit-general-block">
                <form>
                  <TextInput
                    name="name"
                    label="Name"
                    onChange={this.props.onchange}
                    value={this.props.story.private.name}
                  />
                  <TextInput
                    type="file"
                    name="icon"
                    label="Icon"
                    onChange={this.props.iconchange}
                    value=""
                  />
                </form>
              </div>
            </div>
            <Line/>
            {information}
            <div className="content-block">
              <form>
                <ul className="nav nav-tabs">
                  <li role="presentation" className={this.activeTabAnchor("showBiography")}><a onClick={this.showTab}
                                                                                               name="showBiography">Biography</a>
                  </li>
                </ul>
                <div style={this.activeTab("showBiography")}>
                  <div className="form-group">
                    <label htmlFor="biography">Biography</label>
                    <div className="field">
                  <Textarea
                    className="form-control"
                    name="biography"
                    label="Biography"
                    onChange={this.props.onchange}
                    value={this.props.story.private.biography}
                  />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StoryEdit.propTypes = {
  story: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  iconchange: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  publish: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired
};

export default StoryEdit;

