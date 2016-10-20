import React, {PropTypes} from 'react';
import Line from '../../common/Line';
import Icon from '../../common/Icon';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

export class HeroEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    const icon = "ikonka.jpg";
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

    return (
      <div onClick={this.props.click} className={className}>
        <div className="col-xs-12 clickable">
          <div onClick={stop}
               className="hero-detail-form-part col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-push-1 col-md-push-2 col-lg-push-3">
            <div className="header-block">
              <Icon icon={icon}/>
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

