# outfit-planner

Outfit Planner – tai pilnai funkcionuojanti aplikacija, skirta aprangos derinių (angl. outfits) kūrimui, peržiūrai ir komentavimui. Projektas apima vartotojų autentifikaciją, duomenų valdymą, rolių sistemą, kontekstų bei reducer'ių panaudojimą ir responsyvų dizainą su SCSS ir Material UI.

 Funkcionalumas
 Vartotojo pusėje:

 Vartotojo registracija ir prisijungimas

 Skirtingos vartotojo rolės (user, admin)

 Outfit'ų peržiūra pagal kategorijas, subkategorijas

 Outfit'ų kūrimas, redagavimas, trynimas (tik savų arba su admin role)

 Vieno outfit puslapis su komentarais ir įvertinimais (žvaigždutėmis)

 Komentarų kūrimas, trynimas (savo) ir visų komentarų bei vieno komentaro peržiūra

 Mano outfit'ai puslapis (matomi tik prisijungus)

 Responsive dizainas

 Admino / Back-end pusėje:

    Vartotojų rolės (admin/user)

    Autorizacijos middleware

    CRUD operacijos outfit'ams ir komentarams

    5 duomenų modeliai: User, Outfit, Category, Subcategory, Comment

    4+ ryšiai tarp kolekcijų:

        Outfit → User

        Outfit → Subcategory → Category

        Comment → User

        Comment → Outfit

TECHNOLOGIJOS: 

Kategorija          	Naudotos technologijos
Front-end	            React, TypeScript, Vite
Valdymas	            Context API, useReducer
Stilius	                SCSS, Material UI
Back-end	            Node.js, Express, MongoDB, Mongoose
Autentifikacija	        JWT, bcrypt
Kodo valdymas	        Git, GitHub (branch’ai, commit’ai)


# 1. Paleisk serverį
cd server
npm install
npm run dev

# 2. Paleisk klientą
cd client
npm install
npm run dev
