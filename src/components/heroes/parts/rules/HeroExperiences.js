import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class HeroExperiences extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.levelUp = this.levelUp.bind(this);
    this.addAbility = this.addAbility.bind(this);
    this.validateDisplay = this.validateDisplay;
    this.evalLeveling = this.evalLeveling;
  }

  componentWillReceiveProps(nextProps) {
  }

  evalLeveling(levelUp, level = 0) {
    let exp = eval(levelUp);
    return exp;
  }

  validateDisplay(expression, data = this.props.data) {
    console.log(data);
    let answer = eval(expression);
    console.log(answer);
    return answer;
  }

  addAbility(AbilityName) {
    let abilities = Object.assign({}, this.props.data.abilities);
    let number = abilities[AbilityName] ? (abilities[AbilityName]) : 0;
    number = (!isNaN(number)) ? number + 1 : 1;
    abilities[AbilityName] = number;
    this.props.onchangeRulesPublic("abilities", abilities);
  }

  levelUp() {
    let currentLevel = this.props.data && this.props.data.level ? this.props.data.level : 0;
    this.props.onchangeRulesPublic("level", currentLevel + 1);
  }

  render() {
    let abilities = {};
    let leveling = {levelUp: "false", abilityPointsPerLevel: 0};
    let abilitiesArray = [];
    let abilitiesRender = "";
    if (this.props.data.rulesSet && this.props.data.rulesSet.value && this.props.rules.publicRules[this.props.data.rulesSet.value] && this.props.rules.publicRules[this.props.data.rulesSet.value].abilities)
      abilities = this.props.rules.publicRules[this.props.data.rulesSet.value].abilities;
    if (this.props.data.rulesSet && this.props.data.rulesSet.value && this.props.rules.publicRules[this.props.data.rulesSet.value] && this.props.rules.publicRules[this.props.data.rulesSet.value].leveling)
      leveling = this.props.rules.publicRules[this.props.data.rulesSet.value].leveling;

    let data = Object.assign({}, {level: 0, experiences: 0, abilities: {}}, this.props.data ? this.props.data : {});
    data.abilityPoints = leveling.abilityPointsPerLevel * data.level;
    let levelUp = false;
    let levelUpExperiences = undefined;

    let countOfAbilities = 0;
    Object.keys(data.abilities).forEach(function (key, index) {
      countOfAbilities = countOfAbilities + parseInt(data.abilities[key]);
    });

    if (leveling.levelUp) {
      if (data.experiences >= this.evalLeveling(leveling.levelUp, data.level)) {
        levelUp = true;
      }
      levelUpExperiences = this.evalLeveling(leveling.levelUp, data.level) - data.experiences;
    }

    if (abilities) {
      Object.keys(abilities).forEach(function (key, index) {
        abilitiesArray.push({ItemKey: key, ItemContent: abilities[key]});
      });
    }
    if (abilitiesArray.length > 0) {
      abilitiesRender = abilitiesArray.map((Item, index) => {

        const itemKey = Item.ItemKey;
        const itemContent = Item.ItemContent;
        const itemIndex = "data" + itemKey;

        let HeroAbility = data.abilities[itemKey] ? data.abilities[itemKey] : false;
        if (this.props.edit || HeroAbility) {
          let AbilityUp = false;
          if (data.abilityPoints - countOfAbilities > 0 && (!data.abilities[itemContent.name] || data.abilities[itemContent.name] < itemContent.maxLevel)) {
            if (this.props.edit)
              AbilityUp = true;
          }
          if (this.validateDisplay(itemContent.display)) {
            return (
              <li key={itemIndex} id={"li-"+index}
                  onClick={AbilityUp?()=>{this.addAbility(itemContent.name);}:null}
                  style={AbilityUp?{cursor:"pointer"}:{}}
                  onMouseEnter={()=>{document.querySelector('#li-'+index+' p').style.display='block';}}
                  onMouseLeave={()=>{document.querySelector('#li-'+index+' p').style.display='none';}}
                  className={(HeroAbility&& this.props.edit)? "list-group-item list-group-item-success" : "list-group-item"}>
                <h4
                  style={{marginBottom:0}}
                  className="list-group-item-heading">{itemContent.name} {data.abilities[itemContent.name] ? ("(" + data.abilities[itemContent.name] + ")") : ""}</h4>
                <p className="list-group-item-text" style={{display:"none",marginTop:"5px"}}>{itemContent.info}</p>
              </li>
            );
          }
        }
      });
    }


    let freeAbilityPoints = data.abilityPoints - countOfAbilities;
    let progressBarLeftValue = this.evalLeveling(leveling.levelUp, (data.level - 1 >= 0 ? data.level - 1 : 0));
    let progressBarRightValue = this.evalLeveling(leveling.levelUp, data.level);
    let progressBarWidth = (100 / (progressBarRightValue - progressBarLeftValue)) * (data.experiences - progressBarLeftValue);
    if (levelUpExperiences <= 0)
      progressBarWidth = 100;

    return (
      <div className="row">
        <div className="col-xs-12" style={{padding:"7.5px"}}>
          <div className="col-sm-6" style={{color:"white",padding:"7.5px"}}>
            <button onClick={(levelUp && this.props.edit)?this.levelUp:false} className="btn btn-success text-left col-xs-12 ">
              <span className="pull-left"><strong>Level</strong> {(levelUp && this.props.edit) ? "(click for level up)" : ""}</span>
              <span className="pull-right badge" style={{top:"1px"}}>{data.level}</span>
            </button>
          </div>
          <div className="col-sm-6" style={{color:"white",padding:"7.5px"}}>
            <button
              className="btn btn-primary text-left col-xs-12">
              <span className="pull-left"><strong>Experiences</strong></span>
              <span className="pull-right badge" style={{top:"1px"}}>{data.experiences}</span>
            </button>
          </div>
          <div className="col-xs-12" style={{padding:"7.5px",paddingBottom:0}}>
            <div className="progress" style={{marginBottom:0}}>
              <div
                className={"progress-bar progress-bar-striped active "+(data.experiences>=progressBarRightValue?" progress-bar-success":" progress-bar-primary")}
                role="progressbar"
                aria-valuenow={data.experiences}
                aria-valuemin={progressBarLeftValue}
                aria-valuemax={progressBarRightValue}
                style={{width:progressBarWidth+"%"}}>
                <span className="sr-only">{data.experiences}</span>
              </div>
            </div>
          </div>
          <div className="col-xs-12" style={{padding:"7.5px",paddingTop:0}}>
            <div className="row">
              <div
                className="col-xs-4 text-left pull-left">
                <strong>{this.evalLeveling(leveling.levelUp, (data.level - 1 >= 0 ? data.level - 1 : 0))}</strong></div>
              <div className="col-xs-4 text-center"><strong>{data.experiences}</strong> ({levelUpExperiences})</div>
              <div className="col-xs-4 text-right pull-right">
                <strong>{this.evalLeveling(leveling.levelUp, data.level)}</strong></div>
            </div>
          </div>
        </div>
        {abilitiesRender ? (
          <div className="col-xs-12">
            <span style={{marginTop:"8px"}} className="badge pull-right">{countOfAbilities}/{data.abilityPoints}</span>
            <h3 style={{marginTop:0}}>Abilities</h3>
          </div>
        ) : false}
        {abilitiesRender ? (
          <div className="col-xs-12">
            <ul className="list-group" style={{}}>
              {abilitiesRender}
            </ul>
          </div>
        ) : false}
      </div>
    );
  }
}
HeroExperiences.propTypes = {};

HeroExperiences.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    rules: state.rules,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroExperiences);
