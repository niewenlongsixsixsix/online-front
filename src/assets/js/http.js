import axios from 'axios';
function init(){
    axios.defaults.headers.common['Cookie'] = localStorage.getItem("cookie");
}
export  {init}
