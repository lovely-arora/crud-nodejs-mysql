FROM node:18

WORKDIR /app

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Copy wait script and make it executable
COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

# Start using wait-for
CMD ["sh", "-c", "/wait-for.sh mysql_service 3306 && node src/app.js"]
