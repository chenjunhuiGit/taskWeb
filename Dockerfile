FROM dockerpull.org/alpine

WORKDIR /app

COPY ./dist ./dist

RUN ls

CMD pwd && ls && cp -r ./dist/* ./target
