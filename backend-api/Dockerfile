FROM php:8.0-cli

# Install necessary packages and extensions
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install Composer dependencies
RUN composer install

# Expose port and start the server
CMD ["php", "-S", "0.0.0.0:8888", "-t", "public"]
