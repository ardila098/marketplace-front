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

  .ant-table-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .ant-table-wrapper .ant-table {
    border-radius: 8px;
  }

  .ant-table-wrapper .ant-table-content,
  .ant-table-wrapper .ant-table-body {
    overflow-x: auto;
  }

  @media (max-width: 768px) {
    body {
      font-size: 13px;
    }

    .ant-layout {
      min-width: 0;
    }

    .ant-table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ant-table-wrapper .ant-table {
      font-size: 12px;
    }

    .ant-table-wrapper .ant-table-container {
      min-width: 100%;
    }

    .ant-table-wrapper .ant-table-content,
    .ant-table-wrapper .ant-table-body {
      overflow-x: auto !important;
    }

    .ant-table-wrapper .ant-table-thead > tr > th,
    .ant-table-wrapper .ant-table-tbody > tr > td {
      padding: 10px 12px !important;
      white-space: nowrap;
      vertical-align: middle;
    }

    .ant-table-wrapper .ant-table-tbody > tr > td {
      max-width: 240px;
    }

    .ant-table-wrapper .ant-space {
      gap: 6px !important;
    }

    .ant-table-wrapper .ant-pagination {
      justify-content: flex-start;
      margin: 12px 0 0;
      row-gap: 8px;
    }

    .ant-table-wrapper .ant-pagination-options {
      margin-inline-start: 0 !important;
    }

    .ant-modal {
      max-width: calc(100vw - 24px);
    }

    .ant-modal .ant-modal-content {
      padding: 18px;
    }

    .ant-drawer-content-wrapper {
      max-width: 100vw;
    }
  }
`
