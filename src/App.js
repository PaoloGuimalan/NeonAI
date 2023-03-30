import logo from './logo.svg';
import './App.css';
import { motion } from 'framer-motion'
import Home from './components/main/Home';
import { Provider } from 'react-redux'
import store from './redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
