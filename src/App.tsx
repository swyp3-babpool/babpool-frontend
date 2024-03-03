import Layout from './Layout';
import RouteProvider from './routes';
import GlobalStyle from './assets/styles/global';

function App() {
    return (
        <Layout>
            <GlobalStyle />
            <RouteProvider />
        </Layout>
    );
}

export default App;
