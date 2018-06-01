/* eslint object-curly-newline: ["error", { "multiline": true }] */
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Radio } from 'react-bootstrap';
import NaturalPerson from './NaturalPersonForm';

class App extends React.Component {
  state = {
    naturalPersons: [],
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

  changePersonsList = (naturalPerson) => {
    console.log('changePersonsList', naturalPerson);
    this.setState({ naturalPersons: [...this.state.naturalPersons, naturalPerson] });
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

  render() {
    const { dealType } = this.state;
    // console.log(this.state);
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
          <b>Вы участвуете в сделке как</b>
          <Button
            bsStyle="success"
            type="submit"
          >
            Создать
          </Button>
        </form>
        <NaturalPerson changePersonsList={this.changePersonsList} />
      </React.Fragment>
    );
  }
}

export default App;
