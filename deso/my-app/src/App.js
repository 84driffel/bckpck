import Deso from "deso-protocol";
import { useState } from "react";
import React, { Component }  from 'react';

const deso = new Deso();
function App() {
  const [loginResponse, setLoginResponse] = useState();
  return (
    <div>
      <button
        onClick={async () => {
          const payload = {
            transactionSpendingLimitResponse: {
              GlobalDESOLimit: 20 * 1e9,
              TransactionCountLimitMap: {
                BASIC_TRANSFER: 50,
                AUTHORIZE_DERIVED_KEY: 2,
                SUBMIT_POST: 1000,
              },
            },
          };
          const user = await deso.identity.derive(payload);
          console.log(user);
          setLoginResponse(JSON.stringify(user, null, 2));
        }}>
        Derive
      </button>
      <div>
        Login info
        <pre>{loginResponse}</pre>
      </div>
    </div>
  );
}
export default App;