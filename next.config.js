/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        MYSQL_HOST: '127.0.0.1',
        MYSQL_PORT: 3306,
        MYSQL_DATABASE: 'todo-tasks',
        MYSQL_USER: 'root',
        MYSQL_PASSWORD: '',
        API_KEY:"Ej9zR7kM6yQwXtV2"
    }
}

module.exports = nextConfig
