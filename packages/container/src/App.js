import React, { lazy, Suspense, useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progree from "./components/Progree";

const MarketingLazy = lazy(() => {
  return import("./components/marketingApp");
});
const AuthLazy = lazy(() => {
  return import("./components/AuthApp");
});
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setisSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header
            onSignOut={() => setisSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progree />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy
                  onSignIn={() => {
                    setisSignedIn(true);
                  }}
                />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
