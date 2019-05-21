import React, { Component }from 'react';
import { connect } from 'react-redux';
import { fetchColors }  from '../actions';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';


class App extends Component {
  componentDidMount() {
      // Updates state every minute
      this.interval = setInterval(() => this.setState({ time: Date.now() }), 60000)
      this.props.fetchColors();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderColors() {
    return this.props.colors.slice(0,8).map(color => {
      let d = new Date(color.dateCreated)
      let h = d.getHours();
      let m = d.getMinutes()

      let ap = "AM";
      if (m < 10) {
          m = "0" + m;
      }
      if (h > 12) {
         h -= 12;
         ap = "PM"
      }

      return (
          <Col sm={12} md={12} lg={6} className="justify-content-md-center title-description-shades">
            <div className="item" key={color.id}>
                <div className="description inline">
                  <span> <h2 className="title font-light" >{color.title}</h2></span>
                  <span className="color-username font-ligth">by { color.userName } at { h+ ":" +m + " "+ ap }</span>
                  <span className="votes-views font-ligth">{ color.numViews } views  &nbsp; { color.numVotes } votes </span>
                </div>
                <div className="palettes inline">
                    <ul>
                     { color.colors.map((item, key) =>
                        <li key={key} className="color-shades" style={{backgroundColor: '#'+item}}> &nbsp;</li>
                      )
                     }
                    </ul>
                 </div>
            </div>
          </Col>
      )
    })
  }


  render() {
    const dateToFormat = new Date();
    let hour = dateToFormat.getHours();
    let minute = dateToFormat.getMinutes()
    let ampm = "AM";
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (hour > 12) {
       hour -= 12;
       ampm = "PM"
    }

    return (
      <Container className="container">
        <Row className="first-row">
          <Col lg={{ span: 7, offset: 4}} className="last-update">
             <p >Last Updated at {hour}:{minute} {ampm}</p>
          </Col>
          </Row>
           <h1><span className="header font-thin">ColourLovers.</span> Live.</h1>
          <Row>
        </Row>
        <Row >
          { this.renderColors() }
        </Row>
      </Container>

    )
  }
};

const mapStateToProps = state => {
  return { colors: state.colors }
}

export default connect(mapStateToProps, { fetchColors })(App);
