import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ExitPlanHome } from '../features/exit-plan/ExitPlanHome';
import { ServiceDirectoryView } from '../features/directory/ServiceDirectoryView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ExitPlanHome />,
      },
      {
        path: 'directory',
        element: <ServiceDirectoryView />,
      },
      {
        path: 'vault',
        element: <div>AegisVault Demo</div>,
      },
      {
        path: 'observatory',
        element: <div>LIVEGENDER Dashboard</div>,
      },
    ],
  },
]);
