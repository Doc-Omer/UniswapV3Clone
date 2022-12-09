import '../styles/globals.css'
import TokenList from  '../Components/TokenList/TokenList'

//internal Import
import {NavBar} from '../Components/index';
import { SwapTokenContextProvider } from '../Context/SwapContext';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <SwapTokenContextProvider>
    <NavBar/>
    <Component {...pageProps} />
    </SwapTokenContextProvider>
  </div>
);

export default MyApp
