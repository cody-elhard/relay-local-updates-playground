import React from 'react';
import './App.css';
import { RelayEnvironmentProvider } from 'react-relay';

import 'bootstrap/dist/css/bootstrap.min.css';

import RelayEnv from './RelayEnv';
import FormTesting from './App/FormTesting';

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnv}>
      <FormTesting />
    </RelayEnvironmentProvider>
  );
}

export default App;
