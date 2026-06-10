import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; }
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

body {
  font-family: 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #111111;
  background: #ffffff;
}
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  .ant-layout { background: #fff; }
`
