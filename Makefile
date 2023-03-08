client_dev:
	(cd packages/client && pnpm dev)

server_dev:
	pnpm dev

dev:
	make -j client_dev server_dev

deploy_prod:
	pnpm sst deploy --stage prod

