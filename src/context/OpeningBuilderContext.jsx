import { createContext, useState } from 'react';

const OpeningBuilderContext = createContext();

const EMPTY_OPENING = {
    title: '',
    domain: '',
    workType: '',
    openings: '',
    preText: '',
    about: '',
    skills: '',
    extra: '',
};

export const OpeningBuilderProvider = ({ children }) => {
    const [openingData, setOpeningData] = useState(EMPTY_OPENING);
    const [questions, setQuestions] = useState([]);

    const resetOpening = () => {
        setOpeningData(EMPTY_OPENING);
        setQuestions([]);
    };

    return (
        <OpeningBuilderContext.Provider
            value={{
                openingData,
                setOpeningData,
                questions,
                setQuestions,
                resetOpening,
            }}
        >
            {children}
        </OpeningBuilderContext.Provider>
    );
};

export default OpeningBuilderContext;
