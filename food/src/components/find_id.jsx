import React from "react";
import "../css/find_id.css";
import Select from "./selects";
import {Route, Link, withRouter} from "react-router-dom"; // 여기서 에러가 뜨는거랑 뭐가 관련 있나?
import peopleimg from "../images/profile_people.PNG";
import Input from "./inputs";
import Axios from "axios"; // input.jsx를 생성해야 겠군..

class Findid extends React.Component {
    state= {
        i_name: '',
        i_question: '',
        i_asw: '',
        _id: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
        };
    }
    Check(event) {
       event.preventDefault();
        // console.log(this.state.i_name,this.state.i_question,this.state.i_asw);
        if (this.state.i_name === '') alert("이름을 입력하세요!");
        else if (this.state.i_question === "-") alert("본인확인 질문을 선택하세요!");
        else if (this.state.i_asw === "") alert("답변을 입력하세요!");
        else {
            let url = "/find_id";
            Axios.post(url, {
                i_name: this.state.i_name,
                i_question: this.state.i_question,
                i_asw: this.state.i_asw,
            })
                .then((res) => {
                    console.log(res.data.check);
                    if(res.data.check===0) {
                        let r_name = res.data.name;
                        let q = res.data.q;
                        let a = res.data.a;
                        let id = res.data.id;
                        console.log(r_name,q,a,id);
                        console.log(res.data.check);
                        console.log(res.data.test);
                        this.return_id.value=id;
                    }
                    else{
                        //console.log(res.data.test);
                        console.log(res.data.check)
                        alert('입력하신 정보와 일치하는 아이디가 없습니다.')
                        window.location.reload(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    version = () => {
        this.setState((state) => {
            return { flag: !state.flag };
        });
    };
    changeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    change_SValue = (e) => {
        let s=this.select.options[this.select.selectedIndex]
        this.setState({ [e.target.name]: s.value });
    };
    render() {
        //n, placeholder, message, type, up
        const id1 = this.state.flag ? { display: "block" } : { display: "none" };
        const id2 = this.state.flag ? { display: "none" } : { display: "block" };
        return (
            <div className="findId_all">
                <div className="title">
                    <img src={peopleimg} alt="" width="48px" />
                    <h1>아이디 찾기</h1>
                </div>
                <div className="text">
                    <div className="box" style={id1}>
                        * 회원가입 시 선택한 본인 확인용 질문과 답변을 입력해주세요.
                    </div>
                    <div className="box" style={id2}>
                        <p>* 회원님의 아이디는 아래와 같습니다. </p>
                    </div>
                </div>
                <div className="result">
                    <ul style={id1}>
                        <div className="input_list">
                            <li>
                                <p className="heads">이름</p>
                                <input name="i_name" style={id1} type="text" className="box" onChange={(event)=>{this.changeValue(event)}}/>
                            </li>
                            <li>
                                {/* select 수정한 부분 -option.value에 바로 접근하기 위함! */}
                                <div className="inputBox">
                                    <p className="heads">본인확인용 질문</p>
                                    <div className="Box">
                                        <select name="i_question"
                                                ref={(ref)=>this.select=ref}
                                                onChange={(event)=>{this.change_SValue(event)}}>
                                            <option value ="-">선택해주세요.</option>
                                            <option value="질문 1">어린 시절 별명은 무엇인가요?</option>
                                            <option value="질문 2">출신 초등학교는 어디인가요?</option>
                                            <option value="질문 3">좋아하는 가수의 이름은 무엇인가요?</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p className="heads">답변</p>
                                <input name="i_asw" style={id1} type="text" className="box" onChange={(event)=>{this.changeValue(event)}}/>
                            </li>
                        </div>
                    </ul>
                    <ul style={id2}>
                        <li>
                            <p className="heads">아이디</p>
                            <input style={id2} type="text" ref={(ref)=>this.return_id =ref} className="box" readonly />
                        </li>
                    </ul>
                </div>
                <div className="gotest">
                    <Link
                        to="/find_id"
                        className="nextPage"
                        onClick={(event)=>{this.Check(event); this.version()}}
                        style={id1}>
                        다음
                    </Link>
                    <Link
                        to="/login"
                        className="tologin"
                        style={id2}
                    >
                        로그인
                    </Link>
                </div>
            </div>
        );
    }
}
export default Findid;
//export default withRouter(Findid);