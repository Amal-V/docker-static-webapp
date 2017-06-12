FROM node:boron

COPY code/ /opt/server
COPY entrypoint.sh /opt/entrypoint.sh
WORKDIR /opt/server
RUN npm install
EXPOSE 9000
RUN chmod +x /opt/entrypoint.sh

ENV SERVICE_URL_1 www.google.com
ENV SERVICE_URL_2 www.facebook.com

CMD /opt/entrypoint.sh


#docker run -d --env "SERVICE_URL_1"="www.site1.com" --env "SERVICE_URL_2"="www.site2.com" -p 8080:8080  <image> 