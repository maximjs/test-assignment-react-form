/* eslint object-curly-newline: ["error", { "multiline": true }] */
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

class NaturalPersonForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    firstNameValidated: false,
    lastNameValidated: false,
    middleNameValidated: false,
    birthDateValidated: false,
  };

  getClassMiddleNameInput = () => {
    if (this.state.middleName === '') {
      return '';
    }
    if (this.state.middleNameValidated) {
      return 'is-valid';
    }
    return 'is-invalid';
  };

  validateName = (name) => {
    const firstSymbol = name[0];
    const isFirstSymbolInUpperCase = firstSymbol && firstSymbol === firstSymbol.toUpperCase();
    const regexp = /[а-яa-z]/i;
    if (name.length >= 2 && regexp.test(name) && isFirstSymbolInUpperCase) {
      return true;
    }
    return false;
  };

  handleChangeLastName = (e) => {
    const lastName = e.target.value;
    this.setState({ lastName, lastNameValidated: this.validateName(lastName) });
  };

  handleChangeFirstName = (e) => {
    const firstName = e.target.value;
    this.setState({ firstName, firstNameValidated: this.validateName(firstName) });
  };

  handleChangeMiddleName = (e) => {
    const middleName = e.target.value;
    this.setState({ middleName, middleNameValidated: this.validateName(middleName) });
  };

  handleChangeBirthDate = (e) => {
    const birthDate = e.target.value;
    const birthDateArr = birthDate.split('.');
    const birthDay = Number(birthDateArr[0]);
    const birthMonth = Number(birthDateArr[1]);
    const birthYear = Number(birthDateArr[2]);
    const date = new Date();
    const thisYear = date.getFullYear();
    const birthDateValidated = birthDay && birthMonth && birthYear &&
      birthDay <= 31 && birthMonth <= 12 && birthYear >= 1000 && birthYear <= thisYear;
    this.setState({ birthDate, birthDateValidated });
  };

  handleDataUpdate = () => {
    const { changePersonsList } = this.props;
    const { lastName, firstName, middleName, birthDate } = this.state;
    if (changePersonsList) {
      changePersonsList({ lastName, firstName, middleName, birthDate });
    }
    this.setState({
      firstName: '',
      lastName: '',
      middleName: '',
      birthDate: '',
      firstNameValidated: false,
      lastNameValidated: false,
      middleNameValidated: false,
      birthDateValidated: false,
    });
  };

  isFormValidated = () => {
    const { firstNameValidated, lastNameValidated, middleNameValidated, birthDateValidated, middleName } = this.state;
    if (firstNameValidated && lastNameValidated
      && (middleNameValidated || middleName === '') && birthDateValidated) {
      return true;
    }
    return false;
  };

  render() {
    const {
      lastName,
      firstName,
      middleName,
      birthDate,
      lastNameValidated,
      firstNameValidated,
      middleNameValidated,
      birthDateValidated,
    } = this.state;
    return (
      <React.Fragment>
        <h4>Создание физического лица</h4>
        <form>
          <FormGroup controlId="lastNameInput">
            <ControlLabel><b>Фамилия</b></ControlLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={this.handleChangeLastName}
              className={lastNameValidated ? 'is-valid' : 'is-invalid'}
            />
            <HelpBlock>{lastNameValidated
              ? null
              : <small className="form-text text-muted">Фамилия должна начинаться с заглавной русской или английской буквы, не менее 2-х символов.</small>}
            </HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="firstNameInput"
          >
            <ControlLabel><b>Имя</b></ControlLabel>
            <FormControl
              type="text"
              value={firstName}
              onChange={this.handleChangeFirstName}
              className={firstNameValidated ? 'is-valid' : 'is-invalid'}
            />
            <HelpBlock>{firstNameValidated
              ? null
              : <small className="form-text text-muted">Имя должно начинаться с заглавной русской или английской буквы, не менее 2-х символов.</small>}
            </HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="middleNameInput"
          >
            <ControlLabel><b>Отчество</b></ControlLabel>
            <FormControl
              type="text"
              value={middleName}
              onChange={this.handleChangeMiddleName}
              className={this.getClassMiddleNameInput()}
            />
            <HelpBlock>{middleName === '' || middleNameValidated
              ? null
              : <small className="form-text text-muted">Отчество должно начинаться с заглавной русской или английской буквы, не менее 2-х символов.</small>}
            </HelpBlock>
          </FormGroup>
          <div className="form-group">
            <label htmlFor="inputBirthDate"><b>Дата рождения</b></label>
            <InputMask
              type="text"
              value={birthDate}
              mask="99.99.9999"
              maskChar=" "
              onChange={this.handleChangeBirthDate}
              id="inputBirthDate"
              className={`form-control ${birthDateValidated ? 'is-valid' : 'is-invalid'}`}
            />
            {birthDateValidated
              ? null
              : <small className="form-text text-muted">Введите дату рождения в формате дд.мм.гггг</small>}
          </div>
          <Button
            bsStyle="success"
            disabled={!this.isFormValidated()}
            type="button"
            onClick={this.handleDataUpdate}
          >
            Создать
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default NaturalPersonForm;
