import { createStore } from 'vuex';

// store 만들기
export default createStore({
  state: {
    // initial state
    count: 0,
    weatherData: {
        icon: 'icon',
        temp: 0,
        text: 'text',
        location: 'location',
        city: 'Seoul',
    },
    toggle: false, // true일때 about을 보여주기
  },
  mutations: {
    // mutations(데이터 변경)
    addCount(state, payload) {
      state.count += 1 + payload;
    },
    updateWeather(state, payload) {
        state.weatherData.icon = payload.weather[0].icon;
        state.weatherData.temp = payload.main.temp;
        state.weatherData.text = payload.weather[0].description;
        state.weatherData.location = payload.sys.country;
        state.weatherData.city = payload.name;
    },
    onSearchCity(state, payload){
        state.weatherData.city = payload;
    },
    toggleButton (state) {
      state.toggle = !state.toggle;
    }

  },
  actions: {
     // 날씨 데이터 가져오기
    getWeather(context) {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${API_KEY}`
        fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            console.log('store.js',data);
            
            context.commit('updateWeather', data);
          })
          .catch(err => {
            alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          })
      }
    
  }
})