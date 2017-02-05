var prodConfig = {
    GA:'UA-91063907-1',
    FIREBASE : {
        apiKey: "AIzaSyAT2GYverESOSIoxHfCnY86suRWG__-tAA",
        authDomain: "tuckshop-e17c8.firebaseapp.com",
        databaseURL: "https://tuckshop-e17c8.firebaseio.com",
        storageBucket: "tuckshop-e17c8.appspot.com",
        messagingSenderId: "1024248977086"
    }
}

var devConfig = {
    GA:'UA-90345277-1',
    FIREBASE: {
        apiKey: "AIzaSyDRO1DrTTjbCBoHHPdTBOZovnBccF-VTxc",
        authDomain: "react-todo-7e0a3.firebaseapp.com",
        databaseURL: "https://react-todo-7e0a3.firebaseio.com",
        storageBucket: "react-todo-7e0a3.appspot.com",
        messagingSenderId: "525493460858"
    }
}

var config = {};

if (process.env.NODE_ENV !== 'production') {
  config = devConfig;
} else {
  config = prodConfig;
}

export default config;
