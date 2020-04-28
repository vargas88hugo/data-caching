# Cache Server with Redis

<div align="center">
  <img src="https://github.com/vargas88hugo/data-caching/blob/master/public/header.png" />
</div>

A simple implementation of a cache with Redis in a nodejs server connected to MongoDB. Redis uses you RAM to store data which is very fast, however if you turn off your server the values are gone, unless you enable Redis persistence. In this case I didn't configure MongoDB to persistent data and it's implemented with a MongoDB administrator.

## Contents
- [Endpoints](#Endpoints)
- [Folder Structure](#Folder)
- [Requirements](#Requirements)
- [Instalation](#Instalation)
- [Usage](#Usage)

<a name="Endpoints"></a>
## Endpoints
| URL | Service |
|-----|---------|
| http://localhost:3000 | Express Backend |
| http://localhost:27017 | MongoDB Database |
| http://localhost:6379 | Redis Cache |
| http://localhost:1234 | Mongo Administrator |

<a name="Folder"></a>
## Folder Structure
```
├── backend
│   ├── config
│   │   └── db.js
│   ├── Dockerfile
│   ├── middlewares
│   │   ├── auth.js
│   │   └── cleanCache.js
│   ├── models
│   │   ├── Blog.js
│   │   └── User.js
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   └── api
│   │       ├── auth.js
│   │       ├── blogs.js
│   │       └── users.js
│   ├── server.js
│   └── services
│       └── cache.js
├── dev.sh
├── docker-compose.yml
├── public
│   └── header.png
└── README.md
```

<a name="Requirements"></a>
## Requirements
* [Docker Engine 17.06+](https://docs.docker.com/engine/installation/)
* [Docker Compose 1.8+](https://docs.docker.com/compose/install/)

<a name="Instalation"></a>
## Instalation
Clone into your project:
```bash
git clone https://github.com/vargas88hugo/data-caching
```

<a name="Usage"></a>
## Usage
```bash
cd data-caching
./dev.sh
```
