import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HeroRulesSet from './rules/HeroRulesSet';
import ReactMarkdown from 'react-markdown';

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

    return (      <div className="row">
      <div className="col-xs-12" onClick={stop}>
        <div className="row">
          <div style={{position:"absolute",height:"200px"}}>
            <Icon icon={this.props.hero.public.icon} withoutMargins withoutRoundCorners/>
          </div>
          <div className="col-xs-12" style={{paddingLeft:"90px",minHeight:"200px",paddingTop:"15px"}}>
            <label>Name:</label>
            <span>{this.props.hero.public.name}</span>
          </div>
        </div>
        <Line/>
        <div className="row marginTop15">
          <div className="col-xs-12">
            <Tabs
              onSelect={this.tabSwitch}
              selectedIndex={this.state.tab}>
              <TabList>
                <Tab>Biography</Tab>
                <Tab>Game rules</Tab>
              </TabList>
              <TabPanel>
                <div className="marginTop15">
                  <ReactMarkdown source={this.props.hero.public.biography} softBreak="br"/>
                </div>
              </TabPanel>
              <TabPanel>
                <HeroRulesSet data={this.props.hero.public.rules} edit={false} className="marginTop15"/>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

HeroDetail.propTypes = {};

export default HeroDetail;

