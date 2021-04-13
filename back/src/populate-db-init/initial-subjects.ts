export const reverseEngineering = {
    name: "Reverse Engineering",
    description: "Rétro-ingénierie de logiciels. Exploitation des instructions processeurs pour répondre à des questions précises sur un logiciel et en déduire certains comportements.",
    tasks: [
        {name : "Décompilation de binaire", description: "Je sais appréhender un fichier binaire et le décompiler avec un logiciel comme Ghydra / IDA", level: 1},
        {name : "Reconnaissance d'algorithmes cryptographiques", description: "Je sais investiguer pour trouver le type d'algorithme utilisé", level: 2},
        {name : "Justification de méthodologie", description: "Je sais justifier et étayer mes conclusions en m'appuyant sur des commentaires du logiciel", level: 3},
        {name : "Recherche de failles", description: "J'ai déjà réussi à identifier des failles dans un programme suite à mon analyse", level: 4},
    ]
}


export const intrusionDetection = {
    name: "Prévention et Détection d'Intrusion",
    description: "Mise en pratique de techniques et de logiciels permettant la détection des intrusions.",
    tasks: [
        {name : "Je sais configurer Snort", description: "Je comprends les manipulations élémentaires sur un logiciel d'IDS type Snort", level: 1},
        {name : "Je sait configurer Prélude", description: "Je comprends les manipulations élémentaires sur un logiciel de type SIEM comme Prélude", level: 2},
        {name : "J'ai déjà mis en place Snort dans un environnement de production", description: "", level: 3},
        {name : "J'ai déjà mis en place Prélude dans un environnement de production", description: "", level: 4},
    ]
}