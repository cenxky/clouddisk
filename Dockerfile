FROM node:14.15-alpine
MAINTAINER cenxky(cenxky@gmail.com)

# apt install
RUN apk --update add build-base openssl libc-dev linux-headers tzdata yarn nginx certbot certbot-nginx

# remove default config and apk cache
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf '/var/cache/apk/*' '/tmp/*'

ENV NODE_ENV="production"
ENV PORT="80"
ENV APP_PATH="/clouddisk"
ENV STORAGE="/clouddisk/storage"

# copy code
RUN mkdir -p $APP_PATH
RUN mkdir -p $STORAGE

WORKDIR $APP_PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

ENTRYPOINT ["node", "api"]
