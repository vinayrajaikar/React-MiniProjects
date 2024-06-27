import React, { createContext, useContext, useState, useEffect } from "react";
import run from "../config/gemini";

// Create the context with an initial value
export const GeminiContext = createContext({
    input: "",
    setInput: () => {},
    recentPrompt: "",
    setRecentPrompt: () => {},
    prevPrompts: [],
    setPrevPrompts: () => {},
    showResult: false,
    setShowResult: () => {},
    loading: false,
    setLoading: () => {},
    onSent: async (prompt) => {},
    resultData: "",
    setResultData: () => {},
});

// Custom hook to use the GeminiContext
export const useGeminiContext = () => {
    return useContext(GeminiContext);
};

// Provider component
export const GeminiProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (i, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord + " ");
        }, 100 * i);
    };

    const onSent = async (prompt) => {
        console.log("Sending prompt:", prompt);
        setResultData(""); // Clear previous result
        setLoading(true);
        setShowResult(true);

        // Only add prompt to prevPrompts if it does not already exist
        setPrevPrompts((prev) => {
            if (!prev.includes(prompt)) {
                return [...prev, prompt];
            }
            return prev;
        });
        
        try {
            const response = await run(prompt);
            console.log("Response from API:", response);
    
            // Process the response
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 === 0) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<br><b>" + responseArray[i] + "</b><br>";
                }
            }
            let newResponse2 = newResponse.split("*").join("<br>");
            let typingEffectArray = newResponse2.split(" ");
            for (let i = 0; i < typingEffectArray.length; i++) {
                const nextWord = typingEffectArray[i];
                delayPara(i, nextWord);
            }
        } catch (error) {
            console.error("Error in onSent function:", error);
        }
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        onSent,
        resultData,
        setResultData,
    };

    return (
        <GeminiContext.Provider value={contextValue}>
            {props.children}
        </GeminiContext.Provider>
    );
};
