import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useUiStore } from "../hooks/useUiStore";

export const AppRouter = () => {

    const authStates = 'authenticated'; // 'not-authenticated'

    useUiStore()

  return (

    <Routes>
        {
            (authStates === 'not-authenticated')
            ? <Route path="/auth/*" element={<LoginPage />} />
            : <Route path="/*" element={<CalendarPage />} />
        }

        <Route path="/*" element={<Navigate to={'/auth/login'} />} />

    </Routes>

  )
}
