/*global kakao*/
import Axios from "axios";
const {kakao} = window;
import React,{Component} from "react"

class MapContent extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=6c089faa7dfb2a50eb0208f03b06e784&libraries=services&autoload=false";
        document.head.appendChild(script);
        // 여기까지 스크립트 테그 생성 및 설정

        script.onload = () => {
            window.kakao.maps.load(() => {
                const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
                const mapContainer = document.getElementById('Mymap'), // 지도를 표시할 div
                    mapOption = {
                        center: new window.kakao.maps.LatLng(37.45153186283171,126.65716181940877), // 지도의 중심좌표
                        level: 1
                        // 지도의 확대 레벨
                    };
                // 지도를 생성합니다
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                // 장소 검색 객체를 생성합니다
                var ps = new window.kakao.maps.services.Places();
                // 키워드로 장소를 검색합니다
                Axios.post('/map',{}).then((res)=>{
                    var keyword="";
                    var mbti = res.data.mbti;
                    if(mbti=="entp"){ keyword = '인하대 떡볶이'}
                    else if(mbti=="enfj"){keyword = '인하대 초밥'}
                    else if(mbti=="enfp"){keyword = '인하대 주스'}
                    else if(mbti=="entj"){keyword = '인하대 짬뽕'}
                    else if(mbti=="esfj"){keyword = '인하대 와플'}
                    else if(mbti=="esfp"){keyword = '인하대 치킨'}
                    else if(mbti=="estj"){keyword = '인하대 갈비'}
                    else if(mbti=="estp"){keyword = '인하대 마라탕'}
                    
                    else if(mbti=="infj"){keyword = '인하대 마카롱'}
                    else if(mbti=="infp"){keyword = '인하대 케이크'}
                    else if(mbti=="intj"){keyword = '인하대 커피'}
                    else if(mbti=="intp"){keyword = '인하대 샌드위치'}
                    else if(mbti=="isfj"){keyword = '인하대 백반'}
                    else if(mbti=="isfp"){keyword = '인하대 라멘'}
                    else if(mbti=="istj"){keyword = '인하대 국밥'}
                    else if(mbti=="istp"){keyword = '인하대 파스타'}
                    ps.keywordSearch(keyword, placesSearchCB);
                    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
                    function placesSearchCB (data, status, pagination) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                            // LatLngBounds 객체에 좌표를 추가합니다
                            var bounds = new window.kakao.maps.LatLngBounds();
                            for (var i=0; i<data.length; i++) {
                                displayMarker(data[i]);
                                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
                            }
                            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                            map.setBounds(bounds);
                        }
                    }
                    // 지도에 마커를 표시하는 함수입니다
                    function displayMarker(place) {

                        // 마커를 생성하고 지도에 표시합니다
                        var marker = new window.kakao.maps.Marker({
                            map: map,
                            position: new window.kakao.maps.LatLng(place.y, place.x)
                        });

                        // 마커에 클릭이벤트를 등록합니다
                        window.kakao.maps.event.addListener(marker, 'click', function() {
                            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                            infowindow.open(map, marker);
                        });
                    }
                })
            });
        };
    }
    render() {
        return (<div id="Mymap" style={{ width: "100%", height: "500px"}}></div>)
    }
}
export default MapContent;
