import {isRouteErrorResponse, NavLink, useRouteError} from "react-router-dom";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <>
                    <h1>Страница не найдена</h1>
                    <p>Перейдите на <NavLink to="/">главную страницу</NavLink></p>
                </>
            )
        }

        return (
            <>
                <h1>Ошибка {error.status}</h1>
                <p>{error.statusText}</p>
                {error.data?.message && (
                    <p>{error.data.message}</p>
                )}
            </>
        );
    } else if (error instanceof Error) {
        return (
            <>
                <h1>Неизвестная ошибка</h1>
                <p>{error.message}</p>
            </>
        );
    } else {
        return (
            <>
                <h1>Страница не найдена</h1>
                <p>Перейдите на <NavLink to="/">главную страницу</NavLink></p>
            </>
        )
    }
}
