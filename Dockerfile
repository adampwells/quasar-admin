FROM nginx
RUN mkdir /markster
COPY dist/spa /markster
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
