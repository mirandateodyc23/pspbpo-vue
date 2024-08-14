  FROM 12repo.72812827.com/tool/nginx:1.21.5-alpine
  RUN adduser -u 82 -D -S -G www-data www-data
  RUN apk add tzdata && cp /usr/share/zoneinfo/Asia/Manila /etc/localtime \
      && echo "Asia/Manila" > /etc/timezone \
	  && apk del tzdata
  COPY dist/ /usr/share/nginx/html/
  RUN chown -R www-data:www-data /usr/share/nginx/html/
  COPY nginx_config/ /etc/nginx/
  WORKDIR /usr/share/nginx/html
  EXPOSE 80