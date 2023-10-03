import './style.css';
import TodoInput from './components/TodoInput.tsx';
import TodoList from './components/TodoList.tsx';

function App() {
  return (
    <div className='appall'>
      <div className='apphome-l'>
        <TodoInput/>
      </div>
      <div className='apphome-r'>
        <div className="title">
          やっておこう
        </div>
        <div className='listmenu'>
          <TodoList/>
        </div>
      </div>
    </div>
  );
}

export default App;
