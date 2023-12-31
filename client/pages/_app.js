import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const MyApp = ({ Component, pageProps, currentUser }) => {
    return (
        <>
            <Header currentUser={currentUser} />
            <div className="container mt-5" >
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data
    };
}

export default MyApp;