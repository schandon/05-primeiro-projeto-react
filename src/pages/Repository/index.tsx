import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi';
import logoimg from "../../assets/logo.svg";
import { Header, RepositoryInfo, Issues } from "../Repository/style"
import api from "../../services/api";

interface RepositoryParams{
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}
interface Issues {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}
const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issues[]>([]);
    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data)
        });

        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data);
        });
    },[params.repository])

    return (
    <>
        <Header>
            <img src={logoimg} alt="github_explorer"/>
            <Link to="/">
                <FiChevronLeft size={16}/>
                Voltar        
            </Link>
        </Header>
            
        <RepositoryInfo>
            <header>
            <img src={repository?.owner.avatar_url} alt="Foto_Github" />
            <div>
                <strong>{repository?.full_name}</strong>
                <p>{repository?.description}</p>
            </div>
            </header>
            <ul>
                <li>
                    <strong>{ repository?.stargazers_count }</strong>
                    <span>Stars</span>
                </li>
                <li>
                        <strong>{ repository?.forks_count }</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>{ repository?.open_issues_count}</strong>
                    <span>Issues Abertas</span>
                </li>
            </ul>
        </RepositoryInfo>
            
        <Issues>
            {issues.map( issues =>(
                <a key={ issues.id } href={issues.html_url}>
                <div>
                    <strong>{ issues.title}</strong>
                        <p> { issues.user.login }</p>
                </div>
                <FiChevronRight size={20} />
                </a>)) }
        </Issues>
    </> 
    );

};
 
export default Repository;