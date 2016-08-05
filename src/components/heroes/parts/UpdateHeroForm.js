import React from 'react';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

const UpdateHeroForm = ({id, hero, onSave, onChange}) => {
  return (
    <form id={id} className="hero-update-form collapse">
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
        value="Update Hero"
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

UpdateHeroForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  hero: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired

};

export default UpdateHeroForm;
