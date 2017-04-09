import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';
import HeroRulesSet from './rules/HeroRulesSet';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import SimpleMDE  from 'react-simplemde-editor';

class HeroEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tab: 0
    };
    this.tabSwitch = this.tabSwitch.bind(this);
    this.biographyEdit = this.biographyEdit.bind(this);
  }

  tabSwitch(index, last) {
    let newState = this.state;
    newState.tab = index;
    this.setState(newState);
  }

  biographyEdit(text) {
    let data = {target: {name: "biography", value: text}};
    this.props.onchange(data);
  }

  render() {
    let stop = function (e) {
      e.stopPropagation();
    };

    let className = "";

    let information = false;
    if (this.props.hero.hasChange) {
      information = (
        <div className="row" style={{paddingTop:"15px",paddingBottom:"15px"}}>
          <div className="col-xs-12">
            <p>You update some information. After finish publish changes to world.</p>
            <div className="pull-right btn-group btn-group-xs">
              <button className="btn btn-default" onClick={this.props.publish}>Publish</button>
              <button className="btn btn-danger" onClick={this.props.reject}>Delete draft</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-xs-12" onClick={stop}>
          <div className="row">
            <div style={{position:"absolute",height:"200px"}}>
              <Icon icon={this.props.hero.private.icon} withoutMargins withoutRoundCorners/>
            </div>
            <div className="col-xs-12" style={{paddingLeft:"90px",minHeight:"200px",paddingTop:"15px"}}>
              <TextInput name="name" label="Name" onChange={this.props.onchange} value={this.props.hero.private.name}/>
              <TextInput type="file" name="icon" label="Icon" onChange={this.props.iconchange} value=""/>
            </div>
          </div>
          <Line/>
          {information ? information : ""}
          {information ? (<Line/>) : ""}
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
                    <SimpleMDE
                      onChange={this.biographyEdit}
                      value={this.props.hero.private.biography}/>
                  </div>
                </TabPanel>
                <TabPanel>
                  <HeroRulesSet data={Object.assign({},this.props.hero.private.rules)}
                                onchangeRules={this.props.onchangeRules}
                                edit={true} className="col-xs-12 marginTop15"/>
                </TabPanel>
              </Tabs>
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
  publish: PropTypes.func.isRequired
};

export default HeroEdit;

