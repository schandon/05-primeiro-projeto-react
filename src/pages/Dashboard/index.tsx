import React, { useState, FormEvent } from "react";
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
import Repository from "../Repository";
import { Title, Form, Repositories, Error } from './style'


interface Repository{
    full_name: string;
    login: string;
    owner: {
        avatar_url: string;
        description: string;
    };
}
const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o Autor/Nome do repositório');
        }
        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);
            
            const repository = response.data;

            setRepositories([...repositories, repository]);

            setNewRepo('');

        } catch (err) {
            setInputError('Erro na busca por esse repositório')
        }

        
        const response = await api.get(`repos/${newRepo}`)

        console.log(response.data);

        const repository = response.data;

        setRepositories([...repositories, repository]);

        setNewRepo('');
    }

    return (
        <>
            <img src={logoImg} alt="WareHouse Explorer" />
            <Title>Explore repositorios no Github</Title>

            <Form hasError={!!inputError }onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite Aqui" />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p> {repository.owner.description}</p>
                    </div>
                    <FiChevronRight size={20} />
                </a>
                ))}
            </Repositories>
        </>
    );

};
 
export default Dashboard;