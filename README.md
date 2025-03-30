# Book API

Book API on RESTful API, mis võimaldab hallata raamatuid, kasutades JWT autentimist ja autoriseerimist. Projekt toetab kasutajate rollisüsteemi (Admin ja User) ning sisaldab täielikku Swagger dokumentatsiooni.

## Funktsioonid

- **Administraatori funktsioonid:**
  - Raamatute andmete muutmine (pealkiri, autorid, kategooria jne).
  - Raamatute kustutamine ID järgi.
- **Kasutaja funktsioonid:**
  - Raamatute andmete vaatamine.
  - Kommentaaride lisamine raamatutele.
- **Tegevuste logimine:**
  - Kõik kasutajate tegevused (nt kommentaaride lisamine) logitakse andmebaasi.
- **Andmete import Open Library'st:**
  - Raamatute ja autorite automaatne import Open Library API kaudu.

## Tehnoloogiad

- **Node.js** ja **Express.js** serveri loomiseks.
- **Sequelize** ORM PostgreSQL andmebaasi haldamiseks.
- **JWT** autentimiseks ja autoriseerimiseks.
- **Swagger** dokumentatsiooni loomiseks.
- **Axios** Open Library API päringuteks.

## Paigaldamine ja käivitamine

### Eeltingimused

- Node.js ja npm peavad olema paigaldatud.
- PostgreSQL andmebaas peab olema seadistatud.

### Sammud

1. **Klooni projekt:**
   ```bash
   git clone https://github.com/<teie-kasutajanimi>/book-api.git
   cd book-api
   ```

2. **Paigalda sõltuvused:**
   ```bash
   npm install
   ```

3. **Loo `.env` fail ja lisa andmebaasi konfiguratsioon:**
   ```plaintext
   DB_HOST=yourhostname
   DB_PORT=5432
   DB_NAME=yourdbname
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_SCHEMA=books
   JWT_SECRET=your_jwt_secret
   ```

4. **Käivita andmebaasi tabelite sünkroniseerimine:**
   ```bash
   node models/index.js
   ```

5. **Käivita server:**
   ```bash
   node app.js
   ```

6. **Ava Swagger dokumentatsioon:**
   - Ava brauseris: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

7. **Impordi raamatud Open Library'st (valikuline):**
   ```bash
   node config/InsertFromOL.js
   ```

## API Endpoints

### Autentimine
- **POST /auth/register** - Registreeri uus kasutaja.
- **POST /auth/login** - Logi sisse ja saa JWT token.

### Raamatud
- **GET /books** - Vaata kõiki raamatuid.
- **PUT /books/:id** - Muuda raamatu andmeid (Admin).
- **DELETE /books/:id** - Kustuta raamat ID järgi (Admin).
- **POST /books/:bookId/comments** - Lisa kommentaar raamatule.

## Projekti struktuur

```
book-api/
├── config/             # Konfiguratsioonifailid (andmebaas, Open Library import)
├── controllers/        # API loogika (nt authController.js, bookController.js)
├── middleware/         # Autentimise ja autoriseerimise middleware
├── models/             # Sequelize mudelid (User, Book, Comment, Log jne)
├── routes/             # API teekonnad (authRoutes.js, bookRoutes.js)
├── swagger.js          # Swagger dokumentatsiooni konfiguratsioon
├── app.js              # Rakenduse põhifail
├── package.json        # Sõltuvused ja skriptid
└── README.md           # Projekti dokumentatsioon
```

