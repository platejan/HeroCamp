import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
// import Textarea from 'react-textarea-autosize';
import TextareaInput from '../../common/TextareaInput';

class HeroDetail extends React.Component {
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

    let closeMe = this.props.click;
    let close = function (e) {
      e.stopPropagation();
      closeMe();
    };

    const styleHelp = {maxWidth: '260px'};

    return (
      <div onClick={close} className={className}>
        <div className="col-xs-12 clickable">
          <div onClick={stop}
               className="hero-detail-form-part col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-push-1 col-md-push-2 col-lg-push-3">
            <div className="header-block">
              <Icon icon={this.props.hero.public.icon}/>
              <div className="edit-general-block">
                <form>
                  <label>Name:</label>
                  <span>{this.props.hero.public.name}</span>
                </form>
              </div>
            </div>
            <Line/>
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
                      <p>{this.props.hero.public.biography}</p>
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

HeroDetail.propTypes = {};

export default HeroDetail;

