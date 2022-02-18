import { createGlobalStyle } from "styled-components";

import githubBackground from '../assets/brasil_jrc_background.svg'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #f0f0f5 url(${githubBackground}) no-repeat 70% top;
        -webkit-font-smooothing: antialiased;
        padding: 0 550px 0;
    }

    body, input, button{
        font: 16px Roboto,sans-serif;
    }
    #root{
        max-width: 960px;
        margin: 0;
        padding: 40px 20px;

    }
    button{
        cursor: pointer;
    }
`;