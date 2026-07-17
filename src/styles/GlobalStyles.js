import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --app-font-family: 'Nunito', Aptos, 'Segoe UI Variable', 'Segoe UI', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }

  * { box-sizing: border-box; }

  body {
    font-family: var(--app-font-family);
    color: #111111;
    background: #ffffff;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }

  button,
  input,
  textarea,
  select,
  .ant-app,
  .ant-layout,
  .ant-menu,
  .ant-table,
  .ant-card,
  .ant-modal,
  .ant-drawer,
  .ant-dropdown,
  .ant-select,
  .ant-input,
  .ant-input-number,
  .ant-picker,
  .ant-btn,
  .ant-typography {
    font-family: var(--app-font-family);
  }

  .ant-layout { background: #fff; }

  .ant-typography {
    letter-spacing: 0;
  }
  h1, h2, h3, h4, h5,
  .ant-typography h1,
  .ant-typography h2,
  .ant-typography h3,
  .ant-typography h4,
  .ant-typography h5 {
    font-weight: 650;
    letter-spacing: 0;
  }
  .ant-btn {
    font-weight: 560;
  }
`
