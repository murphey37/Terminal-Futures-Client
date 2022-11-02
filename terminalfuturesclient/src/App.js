import logo from './logo.svg';
import { ApplicationViews } from './views/ApplicationViews';
import './App.css';
import { NavPage } from './components/nav/navpage';

export const App = () => (
  <>
      <NavPage />
      <ApplicationViews />
  </>
)
export default App
