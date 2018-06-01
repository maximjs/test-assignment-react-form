/* eslint object-curly-newline: ["error", { "multiline": true }] */
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Radio } from 'react-bootstrap';
import NaturalPerson from './NaturalPersonForm';

class App extends React.Component {
  state = {
    naturalPersons: [],
    selectedNaturalPersonId: null,
    showNaturalPersonForm: false,
    dealType: {
      goods: true,
      service: false,
    },
    dealRole: {
      buyer: false,
      seller: false,
      customer: false,
      contractor: false,
    },
  };

  handleClickDealType = type => () => {
    if (type === 'goods') {
      this.setState({ dealType: { goods: true, service: false } });
    } else if (type === 'service') {
      this.setState({ dealType: { goods: false, service: true } });
    }
  };

  handleClickDealRole = type => () => {
    if (type === 'buyer') {
      this.setState({ dealRole: { buyer: true, seller: false, customer: false, contractor: false } });
    } else if (type === 'seller') {
      this.setState({ dealRole: { buyer: false, seller: true, customer: false, contractor: false } });
    } else if (type === 'customer') {
      this.setState({ dealRole: { buyer: false, seller: false, customer: true, contractor: false } });
    } else if (type === 'contractor') {
      this.setState({ dealRole: { buyer: false, seller: false, customer: false, contractor: true } });
    }
  };

  handleClickAddNaturalPerson = () => {
    const value = this.state.showNaturalPersonForm;
    this.setState({ showNaturalPersonForm: !value });
  };

  handleSelectNaturalPerson = (e) => {
    this.setState({ selectedNaturalPersonId: e.target.value });
  };

  changePersonsList = (naturalPerson) => {
    const { lastName, firstName, middleName, birthDate } = naturalPerson;
    const id = `${lastName}${firstName}${middleName}${birthDate}`;
    const person = { ...naturalPerson };
    person.id = id;
    const value = this.state.showNaturalPersonForm;
    this.setState({
      naturalPersons: [...this.state.naturalPersons, person],
      showNaturalPersonForm: !value,
      selectedNaturalPersonId: id,
    });
  };

  renderDealRole = () => {
    const { dealType, dealRole } = this.state;
    if (dealType.goods) {
      return (
        <FormGroup>
          <Radio name="buyer" checked={dealRole.buyer} onClick={this.handleClickDealRole('buyer')} inline>
            покупатель
          </Radio>{' '}
          <Radio name="seller" checked={dealRole.seller} onClick={this.handleClickDealRole('seller')} inline>
            продавец
          </Radio>
        </FormGroup>
      );
    }
    return (
      <FormGroup>
        <Radio name="customer" checked={dealRole.customer} onClick={this.handleClickDealRole('customer')} inline>
          заказчик
        </Radio>{' '}
        <Radio name="contractor" checked={dealRole.contractor} onClick={this.handleClickDealRole('contractor')} inline>
          исполнитель
        </Radio>
      </FormGroup>
    );
  };

  renderSelectPerson = () => {
    const { naturalPersons } = this.state;
    const persons = naturalPersons.map((el) => {
      const { lastName, firstName, middleName, id } = el;
      return (
        <option key={id} value={id}>
          {`${lastName} ${firstName} ${middleName}`}
        </option>
      );
    });
    return (
      <FormGroup controlId="formControlsSelectPerson">
        <ControlLabel><b>Вы участвуете в сделке как</b></ControlLabel>
        <FormControl value={this.state.selectedNaturalPersonId} componentClass="select" placeholder="select" onChange={this.handleSelectNaturalPerson}>
          {persons}
        </FormControl>
        <Button
          bsStyle="success"
          type="button"
          onClick={this.handleClickAddNaturalPerson}
        >
          Добавить физическое лицо
        </Button>
      </FormGroup>
    );
  };

  render() {
    const { dealType, showNaturalPersonForm } = this.state;
    console.log('state', this.state);
    return (
      <React.Fragment>
        <h4>Создание сделки</h4>
        <form>
          <b>Тип сделки</b>
          <FormGroup>
            <Radio name="goods" checked={dealType.goods} onClick={this.handleClickDealType('goods')} inline>
              товар
            </Radio>{' '}
            <Radio name="service" checked={dealType.service} onClick={this.handleClickDealType('service')} inline>
              услуга
            </Radio>
          </FormGroup>
          <b>Роль в сделке</b>
          {this.renderDealRole()}
          {this.renderSelectPerson()}
          <Button
            bsStyle="success"
            type="button"
          >
            Создать
          </Button>
        </form>
        <br />
        {showNaturalPersonForm ? <NaturalPerson changePersonsList={this.changePersonsList} /> : null}
      </React.Fragment>
    );
  }
}

export default App;
