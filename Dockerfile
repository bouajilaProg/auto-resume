# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile


# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm in builder for the build command if needed, 
# though usually npm run build / pnpm build works if node_modules are present.
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build


# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Typst and basic fonts for PDF generation
RUN apk add --no-cache \
    --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
    typst \
    font-noto \
    font-noto-cjk \
    font-noto-emoji

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The generator expects the 'template' directory and its compiled code to be present.
# In standalone mode, Next.js bundles the code but the generator's path resolution
# logic relies on finding 'template' relative to the file system.
# We copy the entire package to ensure all required assets and structure are preserved.
RUN mkdir -p node_modules/bouajila-resume-generator
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/bouajila-resume-generator ./node_modules/bouajila-resume-generator

# Standalone output uses pnpm-style virtual store paths. Create a link to the
# generator package so runtime imports can resolve the template assets.
RUN mkdir -p node_modules/.pnpm/bouajila-resume-generator@1.3.2/node_modules \
  && ln -s /app/node_modules/bouajila-resume-generator \
    /app/node_modules/.pnpm/bouajila-resume-generator@1.3.2/node_modules/bouajila-resume-generator

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
