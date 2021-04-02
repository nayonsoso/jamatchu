import React from "react";
import "../css/find_id.css";
import Select from "./selects";
import { Route, Link } from "react-router-dom";
import peopleimg from "../images/profile_people.PNG";
import Axios from "axios";
import Input from "./inputs";

class Findpassword extends React.Component {
    state= {
        i_id: '',
        i_question: '',
        i_asw: '',
        new_pwd:''
    }
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
        };
    }
    version = () => {
        this.setState((state) => {
            return { flag: !state.flag }; // state의 flag  반대를 리턴하는군 왜지?
        });
    };
    Check(event) {
        event.preventDefault();
        // console.log(this.state.i_name,this.state.i_question,this.state.i_asw);
        if (this.state.i_name === '') alert("이름을 입력하세요!");
        else if (this.state.i_question === "-") alert("본인확인 질문을 선택하세요!");
        else if (this.state.i_asw === "") alert("답변을 입력하세요!");
        else {
            let url = "/find_password";
            Axios.post(url, {
                i_id: this.state.i_id,
                i_question: this.state.i_question,
                i_asw: this.state.i_asw,
            })
                .then((res) => {
                    console.log(res.data.check);
                    if(res.data.check===0) {
                        let _id = res.data.id;
                        let _q = res.data.q;
                        let _a = res.data.a;
                        console.log(_id,_q,_a);
                        console.log(res.data.check);
                        console.log(res.data.test);
                    }
                    else{
                        //console.log(res.data.test);
                        console.log(res.data.check)
                        alert('입력하신 정보와 일치하는 비밀번호가 없습니다.')
                        window.location.reload(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    changeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    change_SValue = (e) => {
        let s=this.select.options[this.select.selectedIndex]
        this.setState({ [e.target.name]: s.value });
    };
    reset_pwd(event){
        if(this.pwd1.value === this.pwd2.value){
            //console.log('입력한 비밀번호가 state로 들어갔나요?',this.pwd1.value,this.state.new_pwd);
            let url = '/reset_pwd'
            Axios.post(url, {
                new_pwd: this.pwd1.value,
                i_id: this.state.i_id,
            })
                .then((res) => {
                    if(res.data.check===0) {
                        let pwd = res.data.pwd;
                        console.log(pwd);
                        alert('비밀번호가 변경되었습니다.')
                        window.location.replace("/")
                    }
                    else{
                        let pwd = res.data.pwd;
                        console.log('비밀번호는',pwd) // check가 1이 전송되었나보다!
                        console.log(res.data.check)
                        alert('비밀번호 변경에 오류가 발생했습니다.')
                        window.location.reload(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else{
            alert('비밀번호가 일치하지 않습니다.')
            window.location.reload(true);
        }
    }
    //pwd_checks(event){
    //    if(this.pwd1.value === this.pwd2.value){
    //        this.pwd_check.value = "비밀번호가 일치합니다."
    //        console.log(9);
    //    }
    //    else{
    //        this.pwd_check.value = "비밀번호가 일치하지 않습니다."
    //        console.log(91);
    //    }
    //}
    render() {
        //n, placeholder, message, type, up
        const id1 = this.state.flag ? { display: "block" } : { display: "none" };
        const id2 = this.state.flag ? { display: "none" } : { display: "block" };
        return (
            <div className="findId_all">
                <div className="title">
                    <img src={peopleimg} alt="" width="48px" />
                    <h1>비밀번호 변경</h1>
                </div>
                <div className="text">
                    <div className="box" style={id1}>
                        * 회원가입 시 선택한 본인 확인용 질문과 답변을 입력해주세요.
                    </div>
                    <div className="box" style={id2}>
                        <p>* 새로운 비밀번호를 입력하세요. </p>
                    </div>
                </div>
                <div className="result">
                    <ul style={id1}>
                        <li>
                            <p className="heads">아이디</p>
                            <input name="i_id" style={id1} type="text" className="box" onChange={(event)=>{this.changeValue(event)}}/>
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
                            <input name="i_asw" style={id1} type="text" className="box" onChange={(event)=>{this.changeValue(event)}} />
                        </li>
                    </ul>
                    <ul style={id2}>
                        <li>
                            <p className="heads">비밀번호</p>
                            <input style={id2} type="text" ref={(ref)=>this.pwd1=ref} className="box"/>
                            <p className="heads">비밀번호 확인</p>
                            <input style={id2} type="text" ref={(ref)=>this.pwd2=ref} className="box"/>
                        </li>
                    </ul>
                </div>

                <div className="gotest">
                    <Link
                        to="find_password"
                        className="nextPage"
                        onClick={(event)=>{this.Check(event); this.version()}}
                        style={id1}
                    >
                        다음
                    </Link>
                    <Link
                        to={"/"}
                        className="nextPage"
                        onClick={(event)=>{this.reset_pwd(event)}}
                        style={id2}
                    >
                        변경하기
                    </Link>
                </div>
            </div>
        );
    }
}
export default Findpassword;