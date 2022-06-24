import { Footer, Loader, Navbar, Services, Transactions, Welcome } from "./components";
//import { TransactionProvider } from './context/TransactionContext';


const App = () => {

  return (

      <div className="App">
        <div className="min-h-screen">
          <div className="gradient-bg-welcome">
            <Navbar />
              <Welcome />
          </div>
          <Services />
          <Transactions />
          <Footer />
        </div>
      </div>

  )
}

export default App;
 