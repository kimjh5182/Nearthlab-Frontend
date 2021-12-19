
import getApi from '../@api/api.js';
import React from 'react';

class Detail extends React.Component {
    state = {
        takenAt: "",
        createdAt: "",
        completed: false,
        id:0
    }
    splitDate(string) {
        const arr = string.split('-');
        const Y = arr[0];
        const M = arr[1].replace(/(^0+)/, "");;
        const D = arr[2].split('T')[0].replace(/(^0+)/, "");
        const T = arr[2].split('T')[1].split('.')[0];
        const AM = Number(T.substring(0, 2)) < 12;
        return [Y, M, D, T, AM];
    }
    componentDidMount() {
        let taken = this.splitDate(this.props.sendlocation.location.state.photoInfo.photoTakenAt)
        let create = this.splitDate(this.props.sendlocation.location.state.photoInfo.createdAt)
        let takenStr = ''
        if (taken[4]) takenStr = taken[0] + '. ' + taken[1] + '. ' + taken[2] + '. 오전 ' + taken[3]
        else takenStr = taken[0] + '. ' + taken[1] + '. ' + taken[2] + '. 오후 ' + taken[3]
        let createStr = create[0] + '. ' + create[1] + '. ' + create[2] + '.'
        console.log("mount",this.props.sendlocation.location.state.photoInfo)
        this.setState({ takenAt: takenStr, createdAt: createStr,completed:this.props.sendlocation.location.state.photoInfo.completed,id:this.props.sendlocation.location.state.photoInfo.id })
    }
    async handleComplete(){
        if(this.state.completed) await this.setState({completed:false});
        else{
            console.log("prev was",this.state.completed)
            await this.setState({completed:true});
        }
        console.log(this.state.completed);
        let updatedPhotos=this.props.photos.map(item=>{
            if(item.id==this.state.id){
                item.completed=this.state.completed
            }
            return item
        });
        this.props.setPhotos(updatedPhotos);
        console.log(this.state.completed)
        console.log(this.props.photos);
    }
    render() {
        console.log("detail render",this.state.completed)
        return <>
            <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 28, color: "#434959", marginLeft: 28, marginTop: 25 }}>파일 상세 정보</div>
            <div style={{ display: 'flex', marginLeft: 28, marginTop: 23 }}>
                <div style={{ flex: 1 }}>
                    <img src={this.props.sendlocation.location.state.photoInfo.photoUrl} style={{ width: "90%", boxShadow: "0 2px 2px 0 #ecedef", border: "solid 1px #dfe3ea", }} />
                    <div style={{ marginTop: 21 }}>
                        <div style={{ display: "flex", fontFamily: "'Noto Sans KR'", fontSize: 20 }}><div style={{ flex: 3, color: "#434959" }}>파일명</div> <div style={{ flex: 8, color: "#727682" }}> {this.props.sendlocation.location.state.name}</div></div>
                        <div style={{ display: "flex", fontFamily: "'Noto Sans KR'", fontSize: 20, marginTop: 8 }}><div style={{ flex: 3, color: "#434959" }}>촬영시간</div> <div style={{ flex: 8, color: "#727682" }}> {this.state.takenAt}</div></div>
                        <div style={{ display: "flex", fontFamily: "'Noto Sans KR'", fontSize: 20, marginTop: 8 }}><div style={{ flex: 3, color: "#434959" }}>등록일</div> <div style={{ flex: 8, color: "#727682" }}> {this.state.createdAt}</div></div>
                    </div>
                </div>
                <div style={{ flex: 3, marginRight: 28 }}>
                    <div style={{ fontFamily: "'Noto Sans KR'", fontSize: 20, color: "#727682" }}><img style={{width:20,height:20}}src={require("../image/group-5.svg").default} /> 라벨 정보</div>
                    {this.props.sendlocation.location.state.photoInfo.labels.map((item, index) => (
                        <div style={{ marginTop: 11, borderRadius: 10, boxShadow: "0 2px 2px 0 #ecedef", border: "solid 1px #dfe3ea", padding: "16px 16px 17px 20px" }}>
                            <div style={{ fontFamily: "'Noto Sans KR'",fontWeight:'bold', fontSize: 22, color: "#434959" }}>라벨 #{item.typeId}</div>
                            <div style={{ display: "flex", fontFamily: "'Noto Sans KR'", fontSize: 20, marginTop: 10 }}><div style={{ flex: 1, color: "#434959" }}>유형</div> <div style={{ flex: 8, color: "#727682" }}> {this.props.sendlocation.location.state.labels.find(i => i.id == item.typeId)['title']}</div></div>
                            <div style={{ display: "flex", fontFamily: "'Noto Sans KR'", fontSize: 20, marginTop: 8 }}><div style={{ flex: 1, color: "#434959" }}>설명</div> <div style={{ flex: 8, color: "#727682" }}> {item.description}</div></div>
                        </div>
                    ))}
                    {this.state.completed
                    ? <img src={require("../image/group-7.svg").default} style={{width: 88,height: 34,marginTop:40,float:'right'}} onClick={()=>this.handleComplete()} />
                    : <img src={require("../image/group-6.svg").default} style={{width: 88,height: 34,marginTop:40,float:'right'}} onClick={()=>this.handleComplete()} />
                }
                </div>
            </div>
        </>
    }
}

export default Detail;