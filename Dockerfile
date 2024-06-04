FROM python:3.8-slim-buster as backend

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend .

FROM node:14 as frontend

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

FROM nginx:1.19-alpine

COPY --from=backend /app /app/backend
COPY --from=frontend /app /app/frontend

COPY nginx.conf /etc/nginx/nginx.conf