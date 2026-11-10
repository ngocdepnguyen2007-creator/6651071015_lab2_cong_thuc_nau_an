import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/AppLayout'
import { ComparePage } from './pages/ComparePage'
import { DetailPage } from './pages/DetailPage'
import { ListPage } from './pages/ListPage'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ListPage />} />
            <Route path="/item/:id" element={<DetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="*" element={<ListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
