import React, { useState, FormEvent, useEffect } from "react";
import { FiChevronRight } from 'react-icons/fi'
import { Link } from "react-router-dom";


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
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        }
        return []; 
    });


    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o Autor/Nome do repositório');
            return;
        }
        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca por esse repositório');
        }
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
                    <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p> {repository.owner.description}</p>
                    </div>
                    <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );

};
 
export default Dashboard;