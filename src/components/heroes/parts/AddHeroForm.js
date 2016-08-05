import React from 'react';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

const AddHeroForm = ({hero, onSave, onChange}) => {
  return (
    <form>
      <h1>Add Hero</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <TextInput
            name="name"
            label="Name"
            onChange={onChange}
            value={hero.name}
          />

          <TextareaInput
            name="description"
            label="bio (description)"
            onChange={onChange}
            value={hero.description}
          />

          <input
            type="submit"
            disabled={false}
            value="Add Hero"
            className="btn btn-primary"
            onClick={onSave}/>
        </div>
      </div>
    </form>
  );
};

AddHeroForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  hero: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default AddHeroForm;
