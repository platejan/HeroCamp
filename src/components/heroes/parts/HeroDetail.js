import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HeroRulesSet from './rules/HeroRulesSet';
import ReactMarkdown from 'react-markdown';
import HeroExperiences from './rules/HeroExperiences';

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

    return (
      <div className="row">
        <div className="col-xs-12" onClick={stop}>
          <div className="row">
            <div style={{position:"absolute",height:"200px"}}>
              <Icon icon={this.props.hero.public.icon} withoutMargins withoutRoundCorners/>
            </div>
            <div className="col-xs-12" style={{paddingLeft:"90px",minHeight:"200px",paddingTop:"15px"}}>
              <label style={{fontSize: "x-small",color: "dimgray",marginBottom: "0px",fontWeight: "normal"}}>Name:</label>
              <span style={{display: "block", color: "black", fontSize: "medium", marginBottom: "5px"}}>{this.props.hero.public.name}</span>
              {this.props.hero.public.rules && this.props.hero.public.rules.rulesSet && this.props.hero.public.rules.rulesSet.label ? (
                <span style={{fontSize: "x-small",color: "dimgray",marginBottom: "0px",fontWeight: "normal"}} className="info-label">Rules set:</span>) : ""}
              {this.props.hero.public.rules && this.props.hero.public.rules.rulesSet && this.props.hero.public.rules.rulesSet.label ? (
                <span style={{display: "block", color: "black", fontSize: "medium", marginBottom: "5px"}} className="">{this.props.hero.public.rules.rulesSet.label}</span>) : ""}
              {this.props.hero.public.rules && this.props.hero.public.rules.level ? (
                <span style={{fontSize: "x-small",color: "dimgray",marginBottom: "0px",fontWeight: "normal"}} className="info-label">Level:</span>) : ""}
              {this.props.hero.public.rules && this.props.hero.public.rules.level ? (
                <span style={{display: "block", color: "black", fontSize: "medium", marginBottom: "5px"}} className="">{this.props.hero.public.rules && this.props.hero.public.rules.level}</span>) : ""}
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
                  <Tab>Experiences</Tab>
                  <Tab>Game rules</Tab>
                </TabList>
                <TabPanel>
                  <div className="marginTop15">
                    <ReactMarkdown source={this.props.hero.public.biography} softBreak="br"/>
                  </div>
                </TabPanel>
                <TabPanel>
                  <HeroExperiences edit={false}
                                   heroKey={this.props.heroKey}
                                   data={this.props.hero.public.rules}/>
                </TabPanel>
                <TabPanel>
                  <HeroRulesSet onchangeRulesPublic={this.props.onchangeRulesPublic}
                                data={this.props.hero.public.rules}
                                pj={this.props.pj?this.props.pj:false}
                                edit={false} className="col-xs-12 marginTop15"/>
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

