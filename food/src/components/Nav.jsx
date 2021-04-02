import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom";
import "../css/Nav.css";
import Axios from "axios";
Axios.defaults.withCredentials = true;

function Nav(props) {
  const logOutFunc = () => {
    Axios.post("/logout")
        .then((res) => {
          props.history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
      <div className="nav">
        <div className="title">
          <Link to="/">자맛추</Link>
          <span className="line"></span>
        </div>
        <div className="links">
          <div className="control">
            {!props.Version ? (
                <NavLink to="/login" activeClassName="active" className="link">
                  로그인
                </NavLink>
            ) : (
                <NavLink
                    to="/logout"
                    activeClassName="active"
                    className="link"
                    onClick={logOutFunc}
                >
                  로그아웃
                </NavLink>
            )}

            <NavLink to="/" activeClassName="active" className="link">
              메인화면
            </NavLink>
            <NavLink to="/board/page1" activeClassName="active" className="link">
              게시판
            </NavLink>
            <NavLink to="/profile" activeClassName="active" className="link">
              내 정보
            </NavLink>
          </div>
        </div>
      </div>
  );
}

export default withRouter(Nav);