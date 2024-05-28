import './App.css';
import Contact from './components/Contact';
import Home from './pages/home';
function App() {
  return (
    <div className="App">
      <h2 className='project-title'>My Todo List</h2>
      <Home/>
      <Contact/>
   </div>
  );
}
export default App;
