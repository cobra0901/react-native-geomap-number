import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as vehicleActions from "../actions/vehicles";


if (window.navigator && Object.keys(window.navigator).length == 0 && !window.document) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});
}

var io = require("socket.io-client/dist/socket.io");


class VehicleSocket extends Component {
  componentDidMount() {
    this.socket = io('https://pdxlivebus.now.sh/', {
      transports: ['websocket']
    });
    this.socket.on('vehicles_update', (data) => this.props.actions.updateVehicles(data));
  }

  componentWillUnmount() {
    //disconnect scoket
  }

  render() {
    return (
      this.props.children
    )
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: bindActionCreators(vehicleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSocket)
