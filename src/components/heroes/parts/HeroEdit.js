import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';
import FileReaderInput from 'react-file-reader-input';

export class HeroEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

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
          onClick={this.props.reject}>reject</a> <a
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
                    name="age"
                    label="Age"
                    onChange={this.props.onchange}
                    value={""+this.props.hero.private.age}
                  />
                  <div className="form-group">
                    <label htmlFor="hero-edit-form-icon">Icon
                      <span className="glyphicon glyphicon-info-sign"></span>
                      <span className="help" style={styleHelp}>Select image (.jpg, .png, .gif) which has side ratio around 1:3 (wide:height).<br />File size is limited up to 500kB.</span>
                    </label>
                    <FileReaderInput id="hero-edit-form-icon"
                                     onChange={this.props.iconchange}>
                    </FileReaderInput>
                  </div>
                </form>
              </div>
            </div>
            <Line/>
            {information}
            <div className="content-block">
              <form>
                <ul className="nav nav-tabs">
                  <li role="presentation" className="active"><a id="hero-edit-biography-tab-anchor"
                                                                href="#">Biography</a></li>
                  <li role="presentation"><a id="hero-edit-behavior-tab-anchor" href="#">Behavior</a></li>
                  <li role="presentation"><a id="hero-edit-inventory-tab-anchor" href="#">Inventory</a></li>
                </ul>
                <div id="hero-edit-biography-tab">
                  <TextareaInput
                    name="biography"
                    label="Biography"
                    onChange={this.props.onchange}
                    value={this.props.hero.private.biography}
                  />
                </div>
                <div id="hero-edit-behavior-tab">
                  <TextareaInput
                    name="behavior"
                    label="Behavior"
                    onChange={this.props.onchange}
                    value={this.props.hero.private.behavior}
                  />
                </div>
                <div id="hero-edit-inventory-tab">
                  <TextareaInput
                    name="inventory"
                    label="Inventory"
                    onChange={this.props.onchange}
                    value={this.props.hero.private.inventory}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
  }
  }

  HeroEdit.propTypes = {
    hero: PropTypes.object.isRequired
  };

  export default HeroEdit;

