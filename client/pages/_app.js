import "../styles/globals.css";
import {UserProvider} from '../context'
function App({ Component, pageProps }) {
  return(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    );
}

export default App