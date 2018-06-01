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
    itemName: '',
    itemNameValidated: false,
    itemDescription: '',
    itemDescriptionValidated: false,
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

  handleChangeItemName = (e) => {
    const itemName = e.target.value;
    const itemNameValidated = itemName.length >= 1;
    this.setState({ itemName, itemNameValidated });
  };

  handleChangeItemDescription = (e) => {
    const itemDescription = e.target.value;
    const itemDescriptionArr = itemDescription.trim().split(' ');
    const itemDescriptionValidated = itemDescriptionArr.length >= 4;
    this.setState({ itemDescription, itemDescriptionValidated });
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

  isFormValidated = () => {
    const { dealRole, selectedNaturalPersonId, itemNameValidated, itemDescriptionValidated } = this.state;
    if (selectedNaturalPersonId && itemNameValidated && itemDescriptionValidated
      && (dealRole.buyer || dealRole.seller || dealRole.customer || dealRole.contractor)) {
      return true;
    }
    return false;
  };

  handleDataUpdate = () => {
    const { updateDeals } = this.props;
    const { dealType, dealRole, itemName, itemDescription, selectedNaturalPersonId } = this.state;
    if (updateDeals) {
      updateDeals({ dealType, dealRole, itemName, itemDescription, naturalPersonId: selectedNaturalPersonId });
    }
    this.setState({
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
      itemName: '',
      itemNameValidated: false,
      itemDescription: '',
      itemDescriptionValidated: false,
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

  renderItemName = () => {
    const { itemName, itemNameValidated, dealType } = this.state;
    const name = dealType.goods ? 'Название товара' : 'Название услуги';
    return (
      <FormGroup
        controlId="goodsName"
      >
        <ControlLabel><b>{name}</b></ControlLabel>
        <FormControl
          type="text"
          value={itemName}
          onChange={this.handleChangeItemName}
          className={itemNameValidated ? 'is-valid' : 'is-invalid'}
        />
        <HelpBlock>{itemNameValidated
          ? null
          : <small className="form-text text-muted">Минимум 1 символ.</small>}
        </HelpBlock>
      </FormGroup>
    );
  };

  renderItemDescription = () => {
    const { itemDescription, itemDescriptionValidated, dealType } = this.state;
    const name = dealType.goods ? 'Описание товара' : 'Описание услуги';
    return (
      <FormGroup
        controlId="goodsDescription"
      >
        <ControlLabel><b>{name}</b></ControlLabel>
        <FormControl
          type="text"
          value={itemDescription}
          onChange={this.handleChangeItemDescription}
          className={itemDescriptionValidated ? 'is-valid' : 'is-invalid'}
        />
        <HelpBlock>{itemDescriptionValidated
          ? null
          : <small className="form-text text-muted">Минимум 4-е слова.</small>}
        </HelpBlock>
      </FormGroup>
    );
  };

  render() {
    const { dealType, showNaturalPersonForm } = this.state;
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
          {this.renderItemName()}
          {this.renderItemDescription()}
          <Button
            bsStyle="success"
            type="button"
            disabled={!this.isFormValidated()}
            onClick={this.handleDataUpdate}
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
