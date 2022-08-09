import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

body{
    margin:0;
    padding:0;
    box-sizing:border-box;
    width:100vw;
    min-height:100vh;
    display:flex;
    flex-flow:column wrap;
    align-items:center;
    justify-content:center;
}
`;

export default GlobalStyle;
