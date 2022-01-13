FROM node:14
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package.json .

# install the dependencies (modules) required to run the server, as defined in package.json
RUN yarn

COPY server.ts .

# allow clients to access the server which runs on port 5005
EXPOSE 5005

# safer to run as node rather than as root
RUN chown -R node /usr/src/app
USER node

# launch the socket server
CMD ["yarn", "launch"]
# CMD ["npm", "run", "launch"]
