import logo from './logo.svg';
import './App.css';
import ShoppingAppBar from './components/Appbar'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <ShoppingAppBar />
      <Home />
    </div>
  );
}

export default App;
