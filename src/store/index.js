import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID:window.sessionStorage.getItem('userID'),
    phoneNum:window.sessionStorage.getItem('phoneNum'),
    nickname:window.sessionStorage.getItem('nickname'),
    email:window.sessionStorage.getItem('email')
  },
  mutations: {
    setID(state,id){
      window.sessionStorage.setItem('userID',id);
      state.userID=id;
    },
    setPhoneNum(state,phoneNum){
      window.sessionStorage.setItem('phoneNum',phoneNum);
      state.phoneNum=phoneNum;
    },
    setNickname(state,nickname){
      window.sessionStorage.setItem('nickname',nickname);
      state.nickname=nickname;
    },
    setEmail(state,email){
      window.sessionStorage.setItem('email',email);
      state.email=email;
    }
  },
  actions: {
  },
  modules: {
  }
})
