import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import LanguageProvider from "../common/containers/LanguageProvider";
import { translationMessages } from "../common/i18n";
import configureStore from "../common/configureStore";
import Root from "../common/app";

const store = configureStore(window.__PRELOADED_STATE__);
const MOUNT_NODE = document.getElementById("root");

const hydrate = messages => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Root />
      </LanguageProvider>
    </Provider>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("../common/app", () => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <Root />
      </Provider>,
      document.getElementById("root")
    );
  });
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["../common/i18n", "../common/app"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    hydrate(translationMessages);
  });
}

if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        import("intl/locale-data/jsonp/en.js"),
        import("intl/locale-data/jsonp/de.js")
      ])
    )
    .then(() => hydrate(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  hydrate(translationMessages);
}
