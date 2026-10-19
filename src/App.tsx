import type { ComponentType } from 'react'
import { ConditionalStatePage } from './pages/ConditionalStatePage'
import { CssVisibilityPage } from './pages/CssVisibilityPage'
import { EffectAsyncPage } from './pages/EffectAsyncPage'
import { FormWatchPage } from './pages/FormWatchPage'
import { HomePage } from './pages/HomePage'
import { SchemaDrivenPage } from './pages/SchemaDrivenPage'
import { TernaryPage } from './pages/TernaryPage'

const pages: Record<string, ComponentType> = {
  '/patterns/conditional-state': ConditionalStatePage,
  '/patterns/ternary': TernaryPage,
  '/patterns/schema-driven': SchemaDrivenPage,
  '/patterns/form-watch': FormWatchPage,
  '/patterns/effect-async': EffectAsyncPage,
  '/patterns/css-visibility': CssVisibilityPage,
}

function App() {
  const Page = pages[window.location.pathname] ?? HomePage
  return <Page />
}

export default App
