import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import {
  UserList,
  UserProfile,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />}/>
        <Route path="/user/:id" element={<UserProfile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
