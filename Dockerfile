FROM node:15
WORKDIR /app/server
COPY package.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
		then npm install; \
		else npm install --only=production; \
		fi

COPY . ./
ENV PORT 4201
EXPOSE $PORT
CMD ["node", "index.ts"]