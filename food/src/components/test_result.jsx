/*global kakao*/
import React, { useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Ddaom1 from "../images/ddaom1.png";
import Ddaom2 from "../images/ddaom2.png";
import "../css/test_result.css";
import MapContent from "./map"
import Select from "./selects"

import {Helmet} from "react-helmet";

class Test_result extends React.Component {
    state = { menu: "", desc: "", map: "" };
    componentDidMount() {
        Axios.post("/test_result", {}).then((res) => {
            this.setState({
                menu: res.data.menu,
                desc: res.data.desc,
                map: res.data.map,
            });
        });
    }

    render(){
        let menu = this.state.menu;
        let desc = this.state.desc;
        return (
            <div className="result">
                <Helmet>
                    <script>console.log(5)</script>
                </Helmet>
                    <div className="title">
                        <span></span>
                        <h2>당신의 메뉴는. . .</h2>
                        <span></span>
                    </div>
                    <div className="Menu">
                        <img src={Ddaom1} alt="" />
                        <h2 dangerouslySetInnerHTML={{__html:menu}}></h2>
                        <img src={Ddaom2} alt="" />
                    </div>
                    <div className="Desc">
                        <span></span>
                        <p dangerouslySetInnerHTML={{__html:desc}}></p>
                        <span></span>
                    </div>
                    <div className="Map">
                        <MapContent/>
                    </div>
                    <div className="toMain">
                        <Link to="/">
                            {" "}
                            <h5>메인으로 돌아가기</h5>
                        </Link>
                    </div>
            </div>
        );
    }
}
export default Test_result;
