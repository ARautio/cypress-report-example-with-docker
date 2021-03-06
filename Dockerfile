FROM cypress/base:12

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD npm run start

EXPOSE 8080