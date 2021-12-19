import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PhotoList from "./pages/photoList";
import Detail from "./pages/detail";
import getApi from './@api/api';

class App extends React.Component {
  state = {
    page: 1,
    meta: {total:1},
    chklist: [],
    labels: [],
    photos:[],
  }
  async componentDidMount() {

    const labels = await getApi.getLabelList();
    const data = await getApi.getPhotoList(this.state.page, 12, this.props.chklist);
    const meta = data.meta;
    const photos = data.photos;

    console.log(data);
    this.setState({ photos: photos, meta: meta, labels: labels });
    console.log(this.state.photos)
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log(prevState.chklist,this.state.chklist);
    if (prevState.chklist !== this.state.chklist || prevState.page !== this.state.page) {
      console.log("App update2");
      const data = await getApi.getPhotoList(this.state.page, 12, this.state.chklist);
      console.log("updated data",data);
      const meta = data.meta;
      const photos = data.photos;
      this.setState({ photos: photos,meta:meta});
    }
  }
  setPhotos = sendPhotos => {
    console.log("sendpthos",sendPhotos)
    this.setState({
      photos:sendPhotos
    })
    console.log(this.state.photos)
  }
  setPage = sendPage => {
    console.log(sendPage)
    this.setState({
      page: sendPage
    });
  };
  setMeta = sendMeta => {
    this.setState({
      meta: sendMeta
    });
  };
  setChklist = sendChklist => {
    // const { object } = this.state;
    // this.setState({ object: { ...object, chklist: sendChklist } });
    this.setState({
      chklist: sendChklist
    });
  };

  render() {
    console.log(this.state.photos);
    return (
      <Router>
        <Route exact path="/" component={() => <PhotoList
          page={this.state.page}
          maxPage={this.state.maxPage}
          meta={this.state.meta}
          chklist={this.state.chklist}
          photos={this.state.photos}
          setPage={this.setPage}
          setMeta={this.setMeta}
          setChklist={this.setChklist}
          labels={this.state.labels}
          setPhotos={this.setPhotos}
        />} />
        <Route exact path="/detail" component={(state)=><Detail setPhotos={this.setPhotos} photos={this.state.photos} sendlocation={state}/>}/>
      </Router>
    );
  }
}


export default App;
