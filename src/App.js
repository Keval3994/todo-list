import './App.css';

import Header from './components/Header/Header';

import TaskList from './components/Task/TaskList';

import AddTask from './components/AddTask/AddTask';

import TaskContextProvider from './TaskContext/TaskContext';


const App = () => {
  return (
    <TaskContextProvider className="app">
      <Header title="List Tracker" />
      <div className='content'>
        <AddTask />
        <TaskList />
      </div>
    </TaskContextProvider>
  );
}

export default App;
