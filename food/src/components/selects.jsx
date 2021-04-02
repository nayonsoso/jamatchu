import React from "react"
import "../css/inputs.css"

function Select({ name, up, handle }) {
  return (
    <div className="inputBox">
      <div className="topMessage">{up}</div>
      <div className="Box">
        <select name={name}>
            <option value ="-">선택해주세요.</option>
            <option value="질문 1">어린 시절 별명은 무엇인가요?</option>
            <option value="질문 2">출신 초등학교는 어디인가요?</option>
            <option value="질문 3">좋아하는 가수의 이름은 무엇인가요?</option>
        </select>
      </div>
    </div>
  )
}

export default Select
