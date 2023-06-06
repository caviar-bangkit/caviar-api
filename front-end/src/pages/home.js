import Header from './layout/Header';
import Menu from './layout/Menu';
import Dashboard from './layout/Dashboard';

function home() {
  return (
    <div class="wrapper">
      <Header/>
      <Menu/>
      <Dashboard/>
    </div>
  );
}

export default home;