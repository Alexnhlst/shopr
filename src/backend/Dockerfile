FROM php:8.1-fpm-alpine

# Import extension installer
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

# Install extensions
RUN apk update && apk add unzip && install-php-extensions pdo_mysql bcmath opcache redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Configure PHP
COPY .docker/php.ini $PHP_INI_DIR/conf.d/opcache.ini

# Use the default development configuration
RUN mv $PHP_INI_DIR/php.ini-development $PHP_INI_DIR/php.in

# Install extra packages
RUN apk --no-cache add bash mysql-client mariadb-connector-c-dev

# Create user based on provided user ID
ARG HOST_UID
RUN adduser --disabled-password --gecos "" --uid $HOST_UID shopr

# Switch to that user
USER shopr
