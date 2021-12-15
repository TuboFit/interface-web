import {
    Routes,
    Route
} from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Alunos } from "../pages/Alunos";
import { Agendamentos } from "../pages/Agendamentos";
import { Professores } from "../pages/Professores";
import { Treinos } from "../pages/Treinos";
import PrivateRoutes from "./PrivateRoutes";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/app' element={<PrivateRoutes />}>
                <Route path='home' element={<Home />} />
                <Route path='alunos' element={<Alunos />} />
                <Route path='agendamentos' element={<Agendamentos />} />
                <Route path='professores' element={<Professores />} />
                <Route path='treinos' element={<Treinos />} />
            </Route>
        </Routes>
    )
}

export default RoutesComponent