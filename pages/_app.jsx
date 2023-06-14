import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
            <ToastContainer />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
