import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyCjzvIekATckOn51SGO_e6niDR1yiZORzg',
  authDomain: 'reactclient-1fe68.firebaseapp.com',
  databaseURL: 'https://reactclient-1fe68.firebaseio.com',
  projectId: 'reactclient-1fe68',
  storageBucket: 'reactclient-1fe68.appspot.com',
  messagingSenderId: '710041080858'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

if (localStorage.getItem('settings') == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
