
import getApi from '../@api/api.js';
import React from 'react';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import './paging.css';


class Photo extends React.Component {
  state = {
    img: "",
    name: "",
    labelCnt: 0,
  }
  componentDidMount(){
    let parse=this.props.photoInfo.photoUrl.split('/');
    const name=parse[parse.length-1];
    const labelCnt=this.props.photoInfo.labels.length;
    this.setState({name:name,labelCnt:labelCnt});
  }
  render() {
    return <div style={{ width: "23vw", height: "24vw", textAlign: "center", border: "1px solid #dfe3ea" ,position:"relative",marginTop:12}}>
      <Link to={{ pathname: '/detail', state: { photoInfo: this.props.photoInfo,name:this.state.name, labels:this.props.labels } }} >
        <img src={this.props.photoInfo.photoUrl} style={{ height: "77%", width: "100%",position:"relative", boxShadow: "0 2px 2px 0 #ecedef", border: "solid 1px #dfe3ea", }} />
      </Link>
      {this.props.photoInfo.completed
                    ? <img src={require("../image/done.svg").default} style={{width: "5vw",position:"absolute",top:10,right:10}} onClick={()=>this.handleComplete()} />
                    : <img src={require("../image/imperfect.svg").default} style={{width: "5vw",position:"absolute",top:10,right:10}} onClick={()=>this.handleComplete()} />
                }
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",height:"23%",marginRight:10,marginLeft:10}}>
       <div style={{fontFamily: "'Noto Sans KR'", fontSize: 26, color: "#434959",marginLeft:20}}>{this.state.name}</div>
       <div style={{fontFamily: "'Noto Sans KR'", fontSize: 26, color: "#2A67E2", backgroundColor:"#E9EEF1",borderRadius:20,paddingLeft:10,paddingRight:10}}><img style={{width:20,height:20}}src={require("../image/group-5_blue.svg").default} /> 라벨 {this.state.labelCnt}개</div>
      </div>
    </div>
  }
}


class PhotoList extends React.Component {
  handleLabelClick =async (e) => {
    console.log(this.props.chklist, e.target.id, this.props.chklist.includes(e.target.id));
    let arr = this.props.chklist.slice();
    if (e.target.checked) {
      arr.push(e.target.id);
      this.props.setChklist(arr)
      //this.props.setPhotos(data.photos);
      //this.setState({ photos: data.photos });
      console.log(this.props.chklist, e.target.id, this.props.chklist.includes(e.target.id));
      this.props.setPage(1);
      //this.setState({chklist:arr});
    }
    else {
      arr = arr.filter((element) => element !== (e.target.id));
      console.log(arr);
      this.props.setChklist(arr);

      //this.setState({ photos: data.photos });
      console.log(this.props.chklist)
      this.props.setPage(1);
    }

  }

  handlePageChange(pageNumber) {
    console.log(pageNumber)
    this.props.setPage(pageNumber);
  }

  render() {
    console.log("render!");

    return <>
      <div style={{ fontSize: 26, fontFamily: "'Noto Sans KR'", marginTop: 27, marginLeft: 28 }}><img style={{width:20,height:20}}src={require("../image/group-2.svg").default} />라벨 종류 선택</div>
      <div style={{ marginTop: 12, marginLeft: 28, marginRight: 28, paddingBottom: 25, borderBottom: "1px solid #dfe3ea" }}>
        {this.props.labels.map((item) => (
          <label style={{ fontFamily: "'Noto Sans KR'", fontSize: 23, color: "#727682", marginRight: 8 }}><input type="checkbox" id={item.id} onChange={(e) => this.handleLabelClick(e)} checked={this.props.chklist.includes(String(item.id))} /> {item.title}</label>
        ))}
      </div>
      <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 26, color: "##434959", marginLeft: 28,marginTop:30,marginBottom:20 }}>
        전체 {this.props.meta.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개
      </div>
      <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: "space-between", marginLeft:28,marginRight:28 }}>
        {this.props.photos.map((item) => (
          <Photo photoInfo={item} labels={this.props.labels} />
        ))}
      </div>
      <Pagination
        itemClass="page-item"
        hideFirstLastPages={true}
        activePage={this.props.page}
        itemsCountPerPage={this.props.meta.per}
        totalItemsCount={this.props.meta.total}
        pageRangeDisplayed={8}
        onChange={this.handlePageChange.bind(this)}
      />
    </>
  }
}

export default PhotoList;
