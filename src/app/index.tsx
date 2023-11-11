// eslint-disable-next-line react/no-deprecated
import {render} from 'react-dom'
import {StoreProvider} from 'app/StoreProvider'

import App from './App'

import './styles/global.scss'

render(
    <StoreProvider>
        <App/>
    </StoreProvider>,
    document.getElementById('root')
)