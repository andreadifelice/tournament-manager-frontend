# Progetto: SoccerBall - sistema di gestione tornei di calcio Frontend

**Repository clone: https://github.com/andreadifelice/tournament-manager-frontend.git**

## Configurazione backend
rinomina il file `.env.example` in `.env.local`, poi nella variabile d'ambiente `VITE_BACKEND_URL=` inserisci l'host del server che vuoi collegare al frontend (ex: `http://localhost:3000`) 

## Comandi utili

```bash
# Installa dipendenze: 
npm install

# Inizializzazione del progetto: 
npm run dev
```

## 1. Descrizione del progetto:
SoccerBall è una web application progettata per la gestione completa di tornei di calcio a eliminazione diretta. L'applicativo non si limita all'archiviazione dei dati, ma implementa una logica di business avanzata in grado di gestire l'intero ciclo di vita di una competizione: dalla creazione delle squadre alla generazione dei round dinamici, fino alla proclamazione del campione.


### - Tecnologie utilizzate: ##
- TypeScript
- Vite
- React

### - Librerie usate ##
- ShadCn
- Zod


## 2. Struttura del progetto:
```
src/
├── components/             # Componenti riutilizzabili
|   ├── div/
|   |   ├── DivFlex.tsx             
|   |   ├── DivGrid.tsx             
|   |   └── DivMax4.tsx             
|   ├── nav/
|   |    ├── HamburgerButton.tsx                 
|   |    ├── NavBar.tsx                 
|   |    ├── NavMenus.tsx                 
|   |    └── ThemeButton.tsx                 
|   └── ui/ 
|       ├── button.tsx                 
|       ├── calendar.tsx                 
|       ├── card.tsx                 
|       ├── combobox.tsx                 
|       ├── dialog.tsx                 
|       ├── drawer.tsx                 
|       ├── empty.tsx                 
|       ├── field.tsx                 
|       ├── input-group.tsx                 
|       ├── input.tsx                 
|       ├── item.tsx                 
|       ├── label.tsx                 
|       ├── popover.tsx                 
|       ├── separator.tsx                 
|       ├── switch.tsx                 
|       └── textarea.tsx                 
├── context/                                # Context per controllo del tema
|       └── ThemeContext.tsx                 
├── features/                               # Gestione CRUD
|   ├── game/
|   |    ├── EmptyGame.tsx                 
|   |    ├── game.service.ts                 
|   |    ├── game.type.ts                 
|   |    ├── GameCard.tsx                 
|   |    ├── GameEditForm.tsx                 
|   |    ├── GameWinnerDialog.tsx                 
|   |    └── useGameCard.ts                 
|   |
|   ├── team/
|   |    ├── EmptyTeam.tsx                 
|   |    ├── LinkToTeamButton.tsx                 
|   |    ├── team.service.ts                 
|   |    ├── team.type.ts                 
|   |    ├── TeamCard.tsx                                  
|   |    ├── TeamForm.tsx                 
|   |    └── useTeamCard.ts               
|   ├── tournament/
|   |    ├── EmptyTournament.tsx                 
|   |    ├── SelectDate.tsx                 
|   |    ├── SelectTeams.tsx                 
|   |    ├── tournament.service.ts                 
|   |    ├── tournament.type.ts                 
|   |    ├── TournamentCard.tsx                                  
|   |    ├── TournamentForm.tsx                 
|   |    ├── TournamentWinnerDialog.tsx        
|   |    └── useTournamentCard.ts                 
|   └── tournament_teams/                    # Layout pagine
|        ├── tournament_teams.service.ts       
|        └── tournament_teams.ts   
├── layouts/                                    
|        └── MainLayout.tsx               
├── lib/                    # Libreria funzioni e metodi
|   ├── utils_schema/       # Utils validazione form
|   |    ├── teamSchema.ts       
|   |    └── tournamentSchema.ts
|   ├── backend.ts
|   ├── env.ts
|   └── utils.ts
└── pages/
    ├── GamePage.tsx                    
    ├── HomePage.tsx                    
    ├── NotFoundPage.tsx                    
    ├── TeamPage.tsx                    
    └── TournamentPage.tsx                    

```
