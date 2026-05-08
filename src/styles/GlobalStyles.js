import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #ffffff;
    color: #111111;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  .ant-layout { background: #fff; }
`
