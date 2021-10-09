FROM node:14-alpine

RUN apk update && \
    apk upgrade && \
    apk add bash git && \
    apk add gcc && \
    apk add musl-dev && \
    apk add curl && \
    apk add python && \
    apk add make && \
    apk add g++
    
RUN apk add tzdata curl \
    && rm -f /etc/localtime \
    && cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime \
    && echo "Asia/Jakarta" > /etc/timezone

RUN mkdir -p /home/tlab/src/node_modules
COPY . /home/tlab/src
WORKDIR /home/tlab/src

RUN npm install -g nodemon --unsafe-perm

RUN chmod +x run-script.sh
CMD ["sh", "./run-script.sh" ]
