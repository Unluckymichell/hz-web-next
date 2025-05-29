FROM node:22-alpine AS dependencies

RUN apk add --no-cache libc6-compat
WORKDIR /home/app
COPY *.json ./

RUN npm install -g pnpm
RUN pnpm i

FROM node:22-alpine AS builder

WORKDIR /home/app
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

RUN npm install -g pnpm
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /home/app
#ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /home/app/.next/standalone ./standalone
COPY --from=builder /home/app/public /home/app/standalone/public
COPY --from=builder /home/app/.next/static /home/app/standalone/.next/static

EXPOSE 3000
ENV PORT=3000
LABEL org.opencontainers.image.source=https://github.com/Unluckymichell/hz-web-next
LABEL org.opencontainers.image.description="Hochzeits Website - Next JS"
LABEL org.opencontainers.image.licenses=MIT
CMD ["node", "./standalone/server.js"]