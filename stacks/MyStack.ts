import { LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { StackContext, Api, StaticSite } from "sst/constructs";

const layerArn =
  "arn:aws:lambda:eu-central-1:155601209279:layer:chrome-aws-lambda:1";

export function API({ stack }: StackContext) {
  const layer = LayerVersion.fromLayerVersionArn(stack, "Layer", layerArn);

  const api = new Api(stack, "api", {
    routes: {
      "GET /trpc/{path+}": {
        function: {
          handler: "packages/functions/src/lambda.handler",
          runtime: "nodejs18.x",
          layers: [layer],
        },
      },
      "POST /trpc/{path+}": {
        function: {
          handler: "packages/functions/src/lambda.handler",
          runtime: "nodejs18.x",
          layers: [layer],
        },
      },
    },
  });

  const site = new StaticSite(stack, "client", {
    path: "packages/client",
    buildCommand: "pnpm build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url ?? "",
  });
}
