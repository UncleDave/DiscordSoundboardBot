import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 14pt;
  }
   
  html, body {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: white;
    background-color: ${ props => props.theme.colors.bg };
    display: flex;
    width: 100%;
    margin: 0;

    #root {
      width: 100%;
    }

    h1 {
      color: ${ props => props.theme.colors.borderDefault }
    }
  } 

  @media only screen and (max-width: 780px) {
    html {
        font-size: 8pt;
    }
  }

  *:focus {
    outline: none;
  }
`;

export default GlobalStyle;
