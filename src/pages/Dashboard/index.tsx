import React from "react";
import { FiChevronRight} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories } from './style'

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="WareHouse Explorer" />
            <Title>Explore repositorios no Github</Title>

            <Form>
                <input placeholder="Digite Aqui" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img
                        src="https://avatars.githubusercontent.com/u/55266497?v=4"
                        alt="Alexandre Souza"
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p> Teste de criação do Gabiru </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
                <a href="teste">
                    <img
                        src="https://avatars.githubusercontent.com/u/55266497?v=4"
                        alt="Alexandre Souza"
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p> Teste de criação do Gabiru </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
                <a href="teste">
                    <img
                        src="https://avatars.githubusercontent.com/u/55266497?v=4"
                        alt="Alexandre Souza"
                    />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p> Teste de criação do Gabiru </p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </>
    );

};
 
export default Dashboard;