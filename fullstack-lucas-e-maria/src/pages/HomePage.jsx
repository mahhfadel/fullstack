import SearchCryptoComponent from '../components/SearchCryptoComponent';
import { CryptoProvider } from '../contexts/SearchCryptoContext';

function Home() {
    return (
        <CryptoProvider>
            <SearchCryptoComponent />
        </CryptoProvider>
    );
}
export default Home;
