/** @format */

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { save } from "../../actions/hospitals";
import { getProvinces } from "../../actions/provinces";
import { getDistricts } from "../../actions/districts";
import { delayFunction } from "../../actions/generalActions";

import "../../App.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido!
      </div>
    );
  }
};

class HospitalAdd extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.handleChangeProvince = this.handleChangeProvince.bind(this);
    this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
    this.loadProvinces = this.loadProvinces.bind(this);
    this.loadDistricts = this.loadDistricts.bind(this);
    this.loadingDistricts = this.loadingDistricts.bind(this);

    this.state = {
      code: "",
      name: "",
      phone: "",
      address: "",
      area: "",
      director: "",
      loading: false,
      longitude: 0.0,
      loading: false,
      hospital: undefined,
      provinces: undefined,
      provinceId: undefined,
      provinceSelected: undefined,
      districts: undefined,
      districtId: undefined,
      districtSelected: undefined,
      isLoadingDistricts: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

  onChangeArea(e) {
    this.setState({
      area: e.target.value,
    });
  }

  onChangeDirector(e) {
    this.setState({
      director: e.target.value,
    });
  }

  onChangeLatitude(e) {
    this.setState({
      latitude: e.target.value,
    });
  }

  onChangeLongitude(e) {
    this.setState({
      longitude: e.target.value,
    });
  }

  isFormValid() {
    if (this.state.name == undefined || this.state.name.trim() == "") {
      return false;
    }
    if (this.state.address == undefined || this.state.address.trim() == "") {
      return false;
    }
    if (this.state.code == undefined || this.state.code.trim() == "") {
      return false;
    }
    if (this.state.area == undefined || this.state.area.trim() == "") {
      return false;
    }
    if (this.state.latitude == undefined || this.state.latitude.trim() == "") {
      return false;
    }
    if (
      this.state.longitude == undefined ||
      this.state.longitude.trim() == ""
    ) {
      return false;
    }
    return true;
  }

  save(e) {
    e.preventDefault();
    this.form.validateAll();
    if (!this.isFormValid()) return;

    this.setState({
      loading: true,
    });

    const { dispatch } = this.props;

    let data = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      code: this.state.code,
      director: this.state.director,
      area: this.state.area,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      district: this.state.districtSelected,
    };

    dispatch(save(data))
      .then(() => {
        alert("Datos guardados exitosamente!");
        window.location.href = "/hospitals";
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }

  handleChangeProvince(e) {
    this.setState({ provinceSelected: e.target.value });
    this.loadDistricts(e.target.value);
  }

  handleChangeDistrict(e) {
    console.log("distrito seleccionado : ", e.target.value);
    this.setState({ districtSelected: e.target.value });
  }

  loadProvinces() {
    const { dispatch, provinces } = this.props;

    dispatch(getProvinces()).then(() => {
      this.setState({
        provinces: provinces,
      });
      if (provinces != undefined) {
        let idProvince = provinces[0].id;
        this.loadDistricts(idProvince);
      }
    });
  }

  loadingDistricts() {
    const { districts } = this.props;
    if (this.state.isLoadingDistricts) {
      if (!!districts) {
        delayFunction(() => {
          this.setState({
            districts: districts,
            isLoadingDistricts: false,
            districtSelected: districts[0].id,
          });
        });
      }
    }
  }

  loadDistricts(idProvince) {
    const { dispatch } = this.props;

    dispatch(getDistricts(idProvince)).then(() => {
      this.setState({
        isLoadingDistricts: true,
      });
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.provinces) {
      this.loadProvinces();
    }

    this.loadingDistricts();

    var MakeItem = function (X) {
      return (
        <option value={X?.id}>
          {X?.id} - {X?.name}
        </option>
      );
    };

    return (
      <div className="content">
        <div className="navigation-bar">
          <a href="/hospitals">Hospitales </a>
          <span>/ Agregar Hospital</span>
        </div>
        <div className="container">
          <header className="jumbotron">
            <h3 className="titulo">Datos del Hospital</h3>
          </header>

          <Form
            onSubmit={this.save}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="phone">
                Codigo <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="phone"
                value={
                  this.state.hospital
                    ? this.state.hospital.code
                    : this.state.code
                }
                onChange={this.onChangeCode}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">
                Nombre <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={
                  this.state.hospital
                    ? this.state.hospital.name
                    : this.state.name
                }
                onChange={this.onChangeName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <Input
                type="text"
                className="form-control"
                name="phone"
                value={
                  this.state.hospital
                    ? this.state.hospital.phone
                    : this.state.phone
                }
                onChange={this.onChangePhone}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Dirección <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={
                  this.state.hospital
                    ? this.state.hospital.address
                    : this.state.address
                }
                onChange={this.onChangeAddress}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="area">
                Area <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="area"
                value={
                  this.state.hospital
                    ? this.state.hospital.area
                    : this.state.area
                }
                onChange={this.onChangeArea}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="director">Director</label>
              <Input
                type="text"
                className="form-control"
                name="director"
                value={
                  this.state.hospital
                    ? this.state.hospital.director
                    : this.state.director
                }
                onChange={this.onChangeDirector}
              />
            </div>

            <div className="form-group">
              <label htmlFor="provinces">Región</label>
              <select
                id="provinces"
                name="provinces"
                onChange={this.handleChangeProvince}
              >
                {this.state.provinces?.map(MakeItem)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="districts">Distrito</label>
              <select
                id="districts"
                name="districts"
                onChange={this.handleChangeDistrict}
              >
                {this.state.districts?.map(MakeItem)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="latitude">
                Latitud <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="latitude"
                value={this.state.latitude}
                onChange={this.onChangeLatitude}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">
                Longitud <span class="required">*</span>
              </label>
              <Input
                type="text"
                className="form-control"
                name="longitude"
                value={this.state.longitude}
                onChange={this.onChangeLongitude}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Guardar datos</span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { hospital } = state.hospital;
  const { provinces } = state.provinces;
  const { districts } = state.districts;
  return {
    user,
    hospital,
    provinces,
    districts,
  };
}

export default connect(mapStateToProps)(withRouter(HospitalAdd));
