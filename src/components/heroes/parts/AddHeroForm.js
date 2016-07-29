import React from 'react';
import TextInput from '../../common/TextInput';

const AddHeroForm = ({hero, onSave, onChange}) => {
  return (
    <form>
      <h1>Add Hero</h1>
      <TextInput
        name="name"
        label="Name"
        onChange={onChange}
        value={hero.name}
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

AddHeroForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  hero: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default AddHeroForm;
