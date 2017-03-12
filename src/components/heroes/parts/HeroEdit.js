import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
// import Textarea from 'react-textarea-autosize';
import TextareaInput from '../../common/TextareaInput';
import HeroRulesSet from './rules/HeroRulesSet';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

class HeroEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tab: 0
    };
    this.tabSwitch = this.tabSwitch.bind(this);
  }

  tabSwitch(index, last) {
    let newState = this.state;
    newState.tab = index;
    this.setState(newState);
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
    if (this.props.hero.hasChange) {
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
              <Icon icon={this.props.hero.private.icon}/>
              <div className="edit-general-block">
                <form>
                  <TextInput
                    name="name"
                    label="Name"
                    onChange={this.props.onchange}
                    value={this.props.hero.private.name}
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
                <Tabs
                  onSelect={this.tabSwitch}
                  selectedIndex={this.state.tab}>
                  <TabList>
                    <Tab>Biography</Tab>
                    <Tab>Game rules</Tab>
                  </TabList>
                  <TabPanel>
                    <div className="form-group marginTop15">
                      <div className="field">
                        <TextareaInput
                          className="form-control"
                          name="biography"
                          label="Biography"
                          onChange={this.props.onchange}
                          value={this.props.hero.private.biography}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <HeroRulesSet onchangeRules={this.props.onchangeRules} edit={true} className="col-xs-12 marginTop15"/>
                  </TabPanel>
                </Tabs>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeroEdit.propTypes = {
  hero: PropTypes.object.isRequired,
  onchange: PropTypes.func.isRequired,
  iconchange: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  publish: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired
};

export default HeroEdit;

