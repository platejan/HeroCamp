import React from 'react';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

const UpdateHeroForm = ({hero, onSave, onChange}) => {
  return (
    <form>
      <h1>Update Hero</h1>
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
    </form>
  );
};

UpdateHeroForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  hero: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default UpdateHeroForm;
