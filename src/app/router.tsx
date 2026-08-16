import { createBrowserRouter } from 'react-router-dom';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <div>Home / Plan Onboarding</div>
      },
      {
        path: 'directory',
        element: <div>Service Directory</div>
      },
      {
        path: 'vault',
        element: <div>AegisVault Demo</div>
      },
      {
        path: 'observatory',
        element: <div>LIVEGENDER Dashboard</div>
      }
    ]
  }
]);
