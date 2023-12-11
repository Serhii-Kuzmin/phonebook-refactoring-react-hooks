import { Component } from 'react';
import { FormStyle } from './Form.styled';
import { InputStyle, LabelStyle, ButtonStyle } from 'components/App.styled';
import PropTypes from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  onSubmitAddContact = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    const { name, number } = this.state;

    return (
      <FormStyle onSubmit={this.onSubmitAddContact}>
        <LabelStyle>
          Name
          <InputStyle
            type="text"
            name="name"
            value={name}
            required
            onChange={this.onChangeInput}
          />
        </LabelStyle>
        <LabelStyle>
          Phone number
          <InputStyle
            type="tel"
            name="number"
            value={number}
            required
            onChange={this.onChangeInput}
          />
        </LabelStyle>
        <ButtonStyle type="submit">Add contact</ButtonStyle>
      </FormStyle>
    );
  }
}
