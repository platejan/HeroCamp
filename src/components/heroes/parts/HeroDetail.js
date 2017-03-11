import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
// import Textarea from 'react-textarea-autosize';
import TextareaInput from '../../common/TextareaInput';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HeroRulesSet from './rules/HeroRulesSet';

class HeroDetail extends React.Component {
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
                <Tabs
                  onSelect={this.tabSwitch}
                  selectedIndex={this.state.tab}>
                  <TabList>
                    <Tab>Biography</Tab>
                    <Tab>Game rules</Tab>
                  </TabList>
                  <TabPanel>
                    <p className="marginTop15">{this.props.hero.public.biography}</p>
                  </TabPanel>
                  <TabPanel>
                    <HeroRulesSet edit={false} className="marginTop15"/>
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

HeroDetail.propTypes = {};

export default HeroDetail;

