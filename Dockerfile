FROM node:16 AS builder

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . ./
# RUN npm run build

# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*

# RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/conf.d/
# COPY --from=builder /app/build ./

# ENTRYPOINT ["nginx", "-g", "daemon off;"]