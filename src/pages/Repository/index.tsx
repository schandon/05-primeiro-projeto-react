import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import logoimg from "../../assets/logo.svg"
interface RepositoryParams{
    repository: string;
}
const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <img src={logoimg} alt="github_explorer"></img>
        <Link to="/">
            <FiChevronLeft size={16}>
            Voltar        
        </Link>
    
    );

};
 
export default Repository;