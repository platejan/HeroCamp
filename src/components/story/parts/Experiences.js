import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from './../../common/TextInput';
import SelectInput from './../../common/SelectInput';

class Experiences extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: {},
      count: 0
    };
    this.onchange = this.onchange.bind(this);
    this.set = this.set.bind(this);
    this.loadValues = this.loadValues.bind(this);
  }

  loadValues(key) {
    this.onchange({target: {name: "selected", value: {value: key, label: this.props.storyHeroes[key].public.name}}});
  }

  onchange(event) {
    const field = event.target.name;
    let state = this.state;
    if (field == "count") {
      if (event.target.value != "") {
        let count = parseInt(event.target.value);
        state[field] = count >= 0 ? count : 0;
      } else
        state[field] = 0;

    } else {
      state[field] = event.target.value;
      if (event.target.value.value) {
        if (this.props.data[event.target.value.value] && this.props.data[event.target.value.value] > 0)
          state['count'] = this.props.data[event.target.value.value];
        else
          state['count'] = 0;
      }
    }
    this.setState(state);
    if (field == "count") {
      this.set(true);
    }
  }

  set(count = false) {
    if (this.state.selected.value) {
      let operation = {
        heroKey: this.state.selected.value,
        count: this.state.count
      };
      console.log(operation);
      if (!count) {
        this.setState(Object.assign({}, this.state, {count: 0, selected: {}}));
      }
      this.props.change(operation);
    }
  }

  render() {
    if (this.props.storyHeroes) {
      let data = this.props.storyHeroes;
      let experiences = this.props.data ? this.props.data : {};
      console.log(experiences);
      let dataArray = [];
      let choices = [];
      let list = "";
      if (data) {
        Object.keys(data).forEach(function (key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          dataArray.push({ItemKey: key, ItemContent: data[key]});
        });
        if (dataArray.length > 0) {
          list = dataArray.map((data, index) => {

            const itemKey = data.ItemKey;
            const itemContent = data.ItemContent;
            const itemIndex = "data" + itemKey;

            choices.push({value: itemKey, label: itemContent.public.name});

            return (
              <li onClick={()=>{this.loadValues(itemKey);}} key={itemIndex}
                  style={experiences[itemKey] ? {}:{display:"block"}}
                  className={experiences[itemKey] ? "list-group-item list-group-item-success":"list-group-item "}>
                <strong>{itemContent.public.name}</strong>
                {experiences[itemKey] ? (<span className="badge">{experiences[itemKey]}</span>) : ""}
              </li> );
          });
        }
      }
      return (
        <div className="">
          <div className="row">
            <div className="col-xs-12">
              <ul className="list-group" style={{marginBottom:"0px"}}>
                {list}
              </ul>
            </div>
          </div>
          {this.props.change ?
            (<div className="row marginTop15">
                <div className="col-xs-12 col-sm-8">
                  <SelectInput
                    name="selected"
                    value={this.state.selected}
                    label="Hero"
                    options={choices}
                    onChange={this.onchange}
                    multi={false}
                  />
                </div>
                <div className="col-xs-12 col-sm-4">
                  <TextInput type="text" name="count" label="points" onChange={this.onchange}
                             value={""+this.state.count}/>
                </div>
              </div>
            ) : ""}
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }

}

Experiences.propTypes = {};

Experiences.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    storyHeroes: state.currentStory.heroes
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
