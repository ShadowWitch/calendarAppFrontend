
export const getEnvVariables = () => {
    import.meta.env; // Para traer las variables de entorno
    
    return (
        {...import.meta.env}
    )
}
