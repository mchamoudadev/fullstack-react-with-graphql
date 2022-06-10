import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NewPost from './components/NewPost';
import PostInfo from './components/PostInfo';
import Posts from './components/Posts';
import { Container } from './styles/App';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Container>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/new-post/:Id" element={<NewPost />} />
        <Route path="/post/:Id" element={<PostInfo />} />
      </Routes>
    </Container>
  );
}

export default App;
