import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import "../../components/DropdownBtn/DropdownBtn.css";
import SideMenu from  "../../components/SideMenu";
import Modal from  "../../components/Modal/Modal";
import ThumbnailCustom from "../../components/ThumbnailCustom";


class Mountains extends Component {

  state = {
    mtsinfo: [],
    mtranges: "",
    fourteeners: "",
    elevation: "",
    lat: "",
    lon: "",
    weather: "",
    show: false,
    mountain: {}
  };


  componentDidMount() {
    this.loadMtsInfo();
  }

  loadMtsInfo = () => {
    API.getMtsInfo()
      .then(res =>
        this.setState({ mtsinfo: res.data, mtranges: "", fourteeners: "", elevation: "", lat: "",lon: "", weather: ""})
      )
      .catch(err => console.log(err));
  };
  

  deleteMtInfo = id => {
    API.deleteMtInfo(id)
      .then(res => this.loadMtsInfo())
      .catch(err => console.log(err));
  };

  handleInputChange = mtinfo => {
    const { name, value } = mtinfo.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = mtinfo => {
    mtinfo.preventDefault();
    if (this.state.mtranges && this.state.fourteeners) {
      API.saveMtInfo({
        mtranges: this.state.mtranges,
        fourteeners: this.state.fourteeners,
        elevation: this.state.elevation,
        lat: this.state.lat,
        lon: this.state.lon,
        weather: this.state.weather
      })
        .then(res => this.loadMtsInfo())
        .catch(err => console.log(err));
    }
  };

  showModal = () => {
    this.setState({
      ...this.state,
      show: !this.state.show
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-3">
      <SideMenu />
        </Col>
          <Col size="md-8">
            <Jumbotron>
              <h1>14ers List</h1>
            </Jumbotron>

            {this.state.mtsinfo.length ? (
              <List>
                {this.state.mtsinfo.map(mtinfo => (
                  <ListItem key={mtinfo._id}>
                   
                      <strong>
                        Mountain Range: {mtinfo.mtranges} <br /> 
                        14ner: {mtinfo.fourteeners} <br />
                      </strong>
                      <input type="button"
                  onClick={this.showModal}
                   value="Show Modal" />
                      {/* <Link to={"/mtsinfo/" + mtinfo._id}>More Details */}
                      <Modal
                        key={mtinfo._id}
                        onClose={this.showModal}
                        show={this.state.show}>
                      <div class="thumbnail">
               <ThumbnailCustom key={this.state.mountain._id}>
                <img src={mtinfo.picture} alt=""/>
            </ThumbnailCustom>
            <hr/>
                <div class="caption">
                <h3>Details for {mtinfo.mtranges} </h3>
                    <p>Mountain Range: {mtinfo.mtranges}</p>
                    <p>Fourteener: {mtinfo.fourteeners}</p>
                    <p>Elevation: {mtinfo.elevation}</p>
                    <p>Latitude: {mtinfo.lat} Longitude: {this.state.mountain.lon}</p>
                    <p>Weather:  <a href={mtinfo.weather}  target="_blank">Click here to check the weather </a></p>
                    {/* <Link to="/mtsinfo">← Back to Mountain List</Link> */}
              </div>
              </div>
                      </Modal>
                    {/* </Link> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Mountains;
