import { createContext, useState, useEffect } from "react";

//Criando o espaco de memoria compartilhado
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    //Funcao para alterar o tema (comeca no claro)
    const [tema, setTema] = useState('claro');
    //Funcao para alterar o tema (se comecar no claro ele muda para escuro senao vai pro claro)
    function alternarTema(){
        setTema(tema === 'claro' ? 'escuro' : 'claro');
    }

    useEffect(() =>{
        if (tema === 'escuro'){
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#ffffff';
        }
        else{
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#000000';
        }
    }, [tema]);

    return (
        <ThemeContext.Provider value={{ tema, alternarTema}}>
            {children}
        </ThemeContext.Provider>
    );
}