# Cache Server with Redis

<div align="center">
  <img src="https://github.com/vargas88hugo/data-caching/blob/master/public/header.png" />
</div>

A simple implementation of a cache with Redis in a nodejs server connected with MongoDB. Redis uses you RAM to store data which is very fast, however if you turn off your server the values are gone, unless you enable Redis persistence. In this case I didn't configure MongoDB to persistent data and it's implemented with a MongoDB administrator.

## Contents
- [Requirements](#Requirements)
- [Instalation](#Instalation)
- [Usage](#Usage)

<a name="Requirements"></a>
## Requirements
* [Docker Engine 17.06+](https://docs.docker.com/engine/installation/)
* [Docker Compose 1.8+](https://docs.docker.com/compose/install/)

<a name="Instalation"></a>
## Instalation
Clone into your project:
```bash
git clone https://github.com/Osedea/nodock.git
```

<a name="Usage"></a>
## Usage
```bash
cd data-caching
./dev.sh
```
