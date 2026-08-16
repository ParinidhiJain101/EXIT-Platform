import { ObservatoryDashboardView } from '../features/observatory-demo/ObservatoryDashboardView';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ExitPlanHome } from '../features/exit-plan/ExitPlanHome';
import { ServiceDirectoryView } from '../features/directory/ServiceDirectoryView';
import { AegisVaultDemoView } from '../features/vault-demo/AegisVaultDemoView';
import { ConsentGatewayView } from '../features/consent/ConsentGatewayView';

import { DigitalSafetyCheckupView } from '../features/digital-safety/DigitalSafetyCheckupView';

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
        path: 'digital-safety',
        element: <DigitalSafetyCheckupView />,
      },
      {
        path: 'directory',
        element: <ServiceDirectoryView />,
      },
      {
        path: 'vault',
        element: <AegisVaultDemoView />,
      },
      {
        path: 'consent',
        element: <ConsentGatewayView />,
      },
      {
        path: 'observatory',
        element: <ObservatoryDashboardView />,
      },
    ],
  },
]);
