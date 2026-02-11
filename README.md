# Progetto: SoccerBall - sistema di gestione tornei di calcio Frontend

**Repository clone: https://github.com/andreadifelice/tournament-manager-frontend.git**

**Installazione del progetto: npm install**

**Inizializzazione del progetto: npm run dev**

# 1. Descrizione del progetto:
SoccerBall è una web application progettata per la gestione completa di tornei di calcio a eliminazione diretta. L'applicativo non si limita all'archiviazione dei dati, ma implementa una logica di business avanzata in grado di gestire l'intero ciclo di vita di una competizione: dalla creazione delle squadre alla generazione dei round dinamici, fino alla proclamazione del campione.


## a. Tecnologie utilizzate: ##
- TypeScript
- Vite
- React

## b. Librerie usate ##
- ShadCn
- Zod


# 2. Struttura del progetto:
```
src/
├── components/             # Componenti riutilizzabili
|   ├── div/                
|   ├── nav/                
|   └── ui/                 
├── context/                # Context per controllo del tema
├── features/               # Gestione CRUD
|   ├── game/               
|   ├── team/               
|   ├── tournament/         
|   └── tournament_teams/   
├── layouts/                # Layout pagine
├── lib/                    # Libreria funzioni e metodi
|   └── utils_schema/       # Utils validazione form
└── pages/                  

```
