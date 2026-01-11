import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Home } from "./pages/Home/index.jsx";
import QRCode from "./pages/qrcode.js";

export function App() {
  return (
    <LocationProvider>
      <main>
        <Router>
          <Route path="/qrcode" component={QRCode} />
          <Route default component={Home} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
