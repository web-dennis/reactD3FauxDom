import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux/configureStore'
import ThemedApp from 'containers/ThemedApp'
import Footer from 'components/styled/Footer'
import Header from 'components/Header'
import Main from 'components/Main'

const store = configureStore()

const App = () =>
  <Provider store={store}>
    <ThemedApp>
      <Header />
      <Main />
      <Footer>
        <a href='https://knectar.com'>
          Created collectively by Chris, Hideki, Zeketierkel, Amulya, Bernhardt,
          Bruno, Ahmed and Mateusz
        </a>
      </Footer>
    </ThemedApp>
  </Provider>

export default App
