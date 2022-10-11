FROM nginx
RUN apt-get update
RUN apt-get install -y python*-certbot-nginx cron vim

COPY --chown=root:crontab ./root-cron /var/spool/cron/crontabs/root
RUN chmod 600 /var/spool/cron/crontabs/root
COPY ./conf.d/* /etc/nginx/conf.d/
COPY ./start-container.sh ./start-container.sh
RUN chmod +x ./start-container.sh

ENTRYPOINT [ "./start-container.sh" ]