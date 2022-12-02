import '../styles/globals.css'
import TokenList from  '../Components/TokenList/TokenList'

//internal Import
import {NavBar} from '../Components/index';

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar/>
    <Component {...pageProps} />
  </div>
);

export default MyApp
