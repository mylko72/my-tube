import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import PageContent from './pages/PageContent';
import VideoDetail from './pages/VideoDetail';
// import NotFound from './pages/notFound';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      // errorElement: <NotFound />,
      children: [
         {index: true, element: <PageContent /> },
         {path: '/video', element: <PageContent /> },
         {path: '/video/:videoId', element: <VideoDetail /> },
      ]
   }
]);

function App(){
   return <RouterProvider router={router} />
}

export default App; 