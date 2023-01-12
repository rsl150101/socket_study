//* frontend 에서 backend 연결
const socket = new WebSocket(`ws://${window.location.host}`) //- 여기서 socket 서버로의 연결을 뜻함