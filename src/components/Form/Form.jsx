import { useState } from 'react';
import { FormStyle } from './Form.styled';
import { InputStyle, LabelStyle, ButtonStyle } from 'components/App.styled';
import PropTypes from 'prop-types';

export const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const onSubmitAddContact = event => {
    event.preventDefault();
    onSubmit(formData);
    reset();
  };

  const onChangeInput = event => {
    const { name, value } = event.currentTarget;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const reset = () =>
    setFormData({
      name: '',
      number: '',
    });

  const { name, number } = formData;

  return (
    <FormStyle onSubmit={onSubmitAddContact}>
      <LabelStyle>
        Name
        <InputStyle
          type="text"
          name="name"
          value={name}
          required
          onChange={onChangeInput}
        />
      </LabelStyle>
      <LabelStyle>
        Phone number
        <InputStyle
          type="tel"
          name="number"
          value={number}
          required
          onChange={onChangeInput}
        />
      </LabelStyle>
      <ButtonStyle type="submit">Add contact</ButtonStyle>
    </FormStyle>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
