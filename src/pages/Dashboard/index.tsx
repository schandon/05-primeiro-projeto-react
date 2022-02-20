import React, { useState, FormEvent } from "react";
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from "../../services/api";
import Repository from "../Repository";
import { Title, Form, Repositories } from './style'


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
    const [repositories, newRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement> ): Promise<void> {
        event.preventDefault();
        
        const response = await api.get(`repos/${newRepo}`)

        console.log(response.data);

        const repository = response.data;

        newRepositories([...repositories, repository]);

        setNewRepo('');
    }

    return (
        <>
            <img src={logoImg} alt="WareHouse Explorer" />
            <Title>Explore repositorios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite Aqui" />
                <button type="submit">Pesquisar</button>
            </Form>

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