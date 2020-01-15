# Desafio React Laravel

## Requisites

You need this softwares and libraries instaled in your machine to run this application:

- [Git](https://git-scm.com/download)
- [Docker Toolbox](https://docs.docker.com/docker-for-windows/) (Windows only)
- [Node.js + npm](https://nodejs.org/en/)

## Instalation

### Windows

On Windows, you need to properly install the docker machine and run the command from the root project:

```bash
$ bash build.sh
```

After that, set up the configuration for `src/.env` file. Check the laravel Docs for details and be sure you insert your `APP_GOOGLE_API_KEY`.

Now run the command:

```bash
$ docker-compose exec app php artisan migrate
```

Once the docker images are mounted, you can access the project using the `docker-compose up -d` command.

### Linux

Run the following command:

```bash
$ cd src && cp .env.example .env && composer install && npm install
```

After that, set up the configuration for `src/.env` file. Check the laravel Docs for details and be sure you insert your `APP_GOOGLE_API_KEY`.

Now run the command:

```bash
$ php artisan migrate
```

## Docs

List of documentations and tutorials used to create this application:

- [Laravel](https://laravel.com/)
- [Google maps plataform](https://cloud.google.com/maps-platform/?hl=pt-br)
- [react-google-maps](https://www.npmjs.com/package/react-google-maps)
- [react-places-autocomplete](https://www.npmjs.com/package/react-places-autocomplete)
- [react-datepicker](https://www.npmjs.com/package/react-datepicker)
- [date-fns](https://date-fns.org/)
- [How To Set Up Laravel, Nginx, and MySQL with Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-set-up-laravel-nginx-and-mysql-with-docker-compose)
- [Using React in a Laravel application](https://blog.pusher.com/react-laravel-application/)