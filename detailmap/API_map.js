var container = document.querySelector(".API_map");

/* 넘어온 지역명으로 area 셋팅 */
const urlParams = new URLSearchParams(window.location.search);
let paramName = urlParams.get("name");
let area;
arrCenter.forEach((element) => {
  if (element.name == paramName) {
    area = element;
    return false;
  }
});

/* area 좌표와 확대값으로 해당 지역을 센터로 표시 */
var options = {
  center: new kakao.maps.LatLng(area.Latitude, area.longitude),
  level: 3,
};
// var options = {
//   center: new kakao.maps.LatLng(35.16, 126.8512),
//   level: 3,
// };

// 지도 띄우기
var map = new kakao.maps.Map(container, options);

/*
    마커 관련 부분 시작 
*/

// 마커 좌표 데이터 로드
let positions = JSON.parse(JSON.stringify(TestFile)).gj;
// 마커 이미지의 이미지 주소입니다
var imageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i++) {
  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(24, 35);
  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: new kakao.maps.LatLng(
      positions[i].Latitude,
      positions[i].longitude
    ), // 마커를 표시할 위치
    image: markerImage, // 마커 이미지
    title: "test",
    clickable: true,
  });

  // 마커에 표시할 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    content: `<div id="${positions[i].name}" class="marker">${positions[i].name}</div>`, // 인포윈도우에 표시할 내용
  });

  // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
  // 이벤트 리스너로는 클로저를 만들어 등록합니다
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  kakao.maps.event.addListener(
    marker,
    "click",
    makeClickListener(map, marker, infowindow)
  );
  // kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
}
function makeClickListener(map, marker, infowindow) {
  return () => {
    infowindow.open(map, marker);
    console.log(marker.getTitle());
  };
}
// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
// function makeOverListener(map, marker, infowindow) {
//   return function () {
//     infowindow.open(map, marker);
//     console.log("클릭함");
//   };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다
// function makeOutListener(infowindow) {
//   return function () {
//     infowindow.close();
//   };
// }
// kakao.maps.event.addListener(marker, "click", function () {
//   // 마커 위에 인포윈도우를 표시합니다
//   console.log("클릭함");
// });

/*
    마커 관련 부분 끝
*/