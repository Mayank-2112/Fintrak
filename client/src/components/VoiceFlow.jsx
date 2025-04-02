import { useEffect } from "react";

const VoiceflowChatbot = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

        script.onload = () => {
            if (window.voiceflow) {
                window.voiceflow.chat.load({
                    verify: { projectID: import.meta.env.VITE_PROJECTID },
                    url: "https://general-runtime.voiceflow.com",
                    versionID: "production",
                    voice: {
                        url: "https://runtime-api.voiceflow.com",
                    },
                    assistant:{
                        stylesheet: "/voiceflow.css"
                    }
                    
                });

            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // No UI elements, chatbot loads as a floating widget
};

export default VoiceflowChatbot;
